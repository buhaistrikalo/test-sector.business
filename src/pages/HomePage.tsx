import { CircularProgress, Container, Stack } from '@mui/material';
import PostsTable from 'components/PostsTable';
import { Outlet } from "react-router-dom";
import { postAPI } from 'services/PostsService';

const HomePage = () => {
    // Redux store
    const { data: posts, error, isLoading } = postAPI.useFetchAllPostsQuery(100)

    return (
        <Container maxWidth='xl'>
            {isLoading && posts ?
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ marginTop: 30, height: '100vh' }}
                >
                    <CircularProgress />
                </Stack>
                : <PostsTable posts={posts} />
            }
            {
                !error &&
                <>
                    Ошибка, не удалось загрузить данные
                </>
            }
            <Outlet />
        </Container>
    )
};

export default HomePage