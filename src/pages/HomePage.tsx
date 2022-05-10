import { Container } from '@mui/material';
import PostsTable from 'components/PostsTable';
import { Outlet } from "react-router-dom";

const HomePage = () => {
    return (
        <Container maxWidth='xl'>
            <PostsTable />
            <Outlet />
        </Container>
    )
};

export default HomePage