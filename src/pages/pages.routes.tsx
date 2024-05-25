import userRoutes from "./user/user.routes";
import Pages from "./pages";
import authRoutes from "./auth/auth.routes";
import NotFound from "./common/not-found";
import PermissionDenied from "./common/permission-denied";
import HomeComponent from "./home/HomeComponent";

const pageRoutes = [
    {
        path: 'pages',
        element: <Pages />,
        children: [
            ...authRoutes,
            ...userRoutes,
            {
                path: '',
                element: <HomeComponent/>
            },
            
            {
                path: '*',
                element: <NotFound/>
            },
            {
                path: 'permission-deined',
                element: <PermissionDenied/>
            },
        ]
    },
]

export default pageRoutes;