import userRoutes from "./user/user.routes";
import Pages from "./pages";
import authRoutes from "./auth/auth.routes";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./common/not-found";
import PermissionDenied from "./common/permission-denied";

const pageRoutes = [
    {
        path: 'pages',
        element: <Pages />,
        children: [
            ...authRoutes,
            ...userRoutes.map(route => ({
                ...route,
                element: <ProtectedRoute element={route.element} />
            })),
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