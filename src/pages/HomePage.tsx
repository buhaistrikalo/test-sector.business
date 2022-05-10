import { FC, useState } from "react";

import { Container, Stack } from '@mui/material';
import SearchBar from "components/SearchBar";
import CustomTable from 'components/CustomTable';
import Pagination from "components/Pagination";
import { postAPI } from "services/PostsService";

const HomePage = () => {
    const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(100)
    // Filter
    const [filter, setFilter] = useState('')
    // Paggination
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
        setPage(page);
    };

    const countPages = posts?.length ? Math.ceil(posts.length / rowsPerPage) : 0

    return (
        <Container maxWidth='xl'>
            <Stack direction='column' spacing={3} mt={3} mb={3}>
                <SearchBar filter={filter} handleChange={handleChangeFilter} />
                <CustomTable posts={posts} filter={filter} page={page} rowsPerPage={rowsPerPage} />
                <Pagination page={page} handleChangePage={handleChangePage} countPages={countPages} />
            </Stack>
        </Container>
    )
};

export default HomePage