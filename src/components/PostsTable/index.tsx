import { useEffect, useState } from "react";

import { Container, Stack } from '@mui/material';
import SearchBar from "components/SearchBar";
import CustomTable from 'components/CustomTable';
import Pagination from "components/Pagination";
import { postAPI } from "services/PostsService";
import { useLocation, useNavigate, useParams, } from "react-router-dom";


const PostsTable = () => {
    // Router 
    const { page } = useParams()
    const navigate = useNavigate()
    // Redux store
    const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(100)
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