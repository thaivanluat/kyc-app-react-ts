import { RouteObject } from "react-router";
import PersonalInformation from "./personal-information/personal-information";
import UserKYC from "./kyc/kyc";
import User from "./user";
import UserList from "./list/user-list";
import ProtectedRoute from "../ProtectedRoute";
import { Role } from "../../shared/interfaces/user.interface";

const userRoutes: RouteObject[] = [
    {
        path: 'user',
        element: <User />,
        children: [
            {
                path: '',
                element: <ProtectedRoute
                    allowRoles={[Role.OFFICER]}>
                    <UserList />
                </ProtectedRoute>
            },
            {
                path: ':id/pi',
                element: <ProtectedRoute
                    allowRoles={[Role.OFFICER, Role.NORMAL_USER]}>
                    <PersonalInformation />
                </ProtectedRoute>
            },
            {
                path: ':id/kyc',
                element: <ProtectedRoute
                    allowRoles={[Role.OFFICER]}>
                    <UserKYC></UserKYC>
                </ProtectedRoute>
            },
        ]
    }
]

export default userRoutes;