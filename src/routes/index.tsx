import { useRoutes, Outlet } from "react-router-dom";
import HomePage from 'pages/HomePage';

const Router = () => {
    return useRoutes([
        {
            path: '*',
            element: <HomePage />, // layout
            children: [
                {
                    path: ':page',
                    element: <Outlet />
                }
            ]
        },
    ]);

}

export default Router