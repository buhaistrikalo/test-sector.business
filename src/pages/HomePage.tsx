import { Container } from '@mui/material';
import PostsTable from 'components/PostsTable';

const HomePage = () => {
    return (
        <Container maxWidth='xl'>
            <PostsTable />
        </Container>
    )
};

export default HomePage