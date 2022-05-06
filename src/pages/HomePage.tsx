import { FC } from "react";

import Container from '@mui/material/Container';
import SearchBar from "components/SearchBar";
import CustomTable from 'components/CustomTable';
import Paggination from "components/Paggination";
import { postAPI } from "services/PostsService";

const HomePage = () => {
    const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(100)

    return (
        <Container>
            <SearchBar />
            <CustomTable posts={posts} />
            <Paggination />
        </Container>
    )
};

export default HomePage