import {RouteObject} from "react-router";
import PersonalInformation from "./personal-information/personal-information";
import UserKYC from "./kyc/kyc";
import User from "./user";
import PendingReview from "./review/pending-review";
import CompletedReview from "./review/completed-review";
import UserList from "./list/user-list";

const userRoutes: RouteObject[] = [
    {
        path: 'user',
        element: <User/>,
        children: [
            {
                path: '',
                element: <UserList/>
            },
            {
                path: ':id/pi',
                element: <PersonalInformation/>
            },
            {
                path: ':id/kyc',
                element: <UserKYC></UserKYC>
            },
            {
                path: 'pending-review',
                element: <PendingReview></PendingReview>
            },
            {
                path: 'completed-review',
                element: <CompletedReview></CompletedReview>
            }
        ]
    }
]

export default userRoutes;