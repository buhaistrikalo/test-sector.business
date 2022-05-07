import { FC, useState } from "react";

import { Container, Stack } from '@mui/material';
import SearchBar from "components/SearchBar";
import CustomTable from 'components/CustomTable';
import Paggination from "components/Paggination";
import { postAPI } from "services/PostsService";

const HomePage = () => {
    const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(100)
    const [filter, setFilter] = useState('')

    const handleChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(event.target.value);
    };

    return (
        <Container >
            <Stack direction='row' spacing={3}>
                <SearchBar filter={filter} handleChange={handleChangeFilter} />
                <CustomTable posts={posts} filter={filter} />
                <Paggination />
            </Stack>
        </Container>
    )
};

export default HomePage