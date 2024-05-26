import userRoutes from "./user/user.routes";
import Pages from "./pages";
import authRoutes from "./auth/auth.routes";
import NotFound from "./common/not-found";
import PermissionDenied from "./common/permission-denied";
import HomeComponent from "./home/HomeComponent";
import reviewRoutes from "./review/review.routes";

const pageRoutes = [
    {
        path: 'pages',
        element: <Pages />,
        children: [
            ...userRoutes,
            ...reviewRoutes,
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
    ...authRoutes
]

export default pageRoutes;