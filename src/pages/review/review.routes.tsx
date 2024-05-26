import { RouteObject } from "react-router";
import PendingReview from "../review/pending-review";
import CompletedReview from "../review/completed-review";
import ProtectedRoute from "../ProtectedRoute";
import ReviewDetail from "../review/review-detail";

const reviewRoutes: RouteObject[] = [
    {
        path: 'review',
        children: [
            {
                path: 'pending-review',
                element: <PendingReview></PendingReview>
            },
            {
                path: 'completed-review',
                element: <CompletedReview></CompletedReview>
            },
            {
                path: ':id/show',
                element: <ReviewDetail></ReviewDetail>
            }
        ]
    }
]

export default reviewRoutes;