import { FC, useEffect, useState } from "react";

import { CircularProgress, Stack } from '@mui/material';
import SearchBar from "components/SearchBar";
import CustomTable from 'components/CustomTable';
import Pagination from "components/Pagination";
import { useNavigate, useParams, } from "react-router-dom";
import { IPost } from 'models/IPost';

interface PostsTableProps {
    posts?: IPost[]
}

const PostsTable: FC<PostsTableProps> = ({ posts }) => {
    // Router 
    const { page } = useParams()
    const navigate = useNavigate()
    // Filter
    const [filter, setFilter] = useState('')
    // Paggination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value)
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
        navigate(`../${page}`, { replace: true })
    };

    useEffect(() => {
        const pageNumber = Number(page) || 1
        setCurrentPage(pageNumber)
    }, [page])

    const countPages = posts?.length ? Math.ceil(posts.length / rowsPerPage) : 0

    return (
        <Stack direction='column' spacing={3} mt={3} mb={3}>
            <SearchBar filter={filter} handleChange={handleChangeFilter} />
            <CustomTable posts={posts} filter={filter} page={currentPage} rowsPerPage={rowsPerPage} />
            {countPages > 0 &&
                <Pagination page={currentPage} handleChangePage={handleChangePage} countPages={countPages} />
            }
        </Stack>
    )
}

export default PostsTable