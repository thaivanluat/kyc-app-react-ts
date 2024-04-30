import {RouteObject} from "react-router";
import PersonalInformation from "./personal-information/personal-information";
import UserKYC from "./kyc/kyc";
import User from "./user";

const userRoutes: RouteObject[] = [
    {
        path: 'user',
        element: <User/>,
        children: [
            {
                path: ':id/pi',
                element: <PersonalInformation/>
            },
            {
                path: ':id/kyc',
                element: <UserKYC></UserKYC>
            }
        ]
    }
]

export default userRoutes;