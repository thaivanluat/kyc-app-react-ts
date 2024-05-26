import { RouteObject } from "react-router";
import PendingReview from "../review/pending-review";
import CompletedReview from "../review/completed-review";
import ProtectedRoute from "../ProtectedRoute";
import ReviewDetail from "../review/review-detail";
import { Role } from "../../shared/interfaces/user.interface";

const reviewRoutes: RouteObject[] = [
    {
        path: 'review',
        children: [
            {
                path: 'pending-review',
                element: <ProtectedRoute
                    allowRoles={[Role.OFFICER]}>
                    <PendingReview></PendingReview>
                </ProtectedRoute>
            },
            {
                path: 'completed-review',
                element: <ProtectedRoute
                    allowRoles={[Role.OFFICER]}>
                    <CompletedReview></CompletedReview>
                </ProtectedRoute>
            },
            {
                path: ':id/show',
                element: <ProtectedRoute
                    allowRoles={[Role.OFFICER]}>
                    <ReviewDetail></ReviewDetail>
                </ProtectedRoute>
            }
        ]
    }
]

export default reviewRoutes;