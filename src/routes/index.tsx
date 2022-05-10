import { useRoutes } from "react-router-dom";
import HomePage from 'pages/HomePage';

const Router = () => {
    return useRoutes([
        {
            path: '*',
            element: <HomePage />,
            children: [
                {
                    path: '*/:page'
                }
            ]
        },
    ]);

}

export default Router