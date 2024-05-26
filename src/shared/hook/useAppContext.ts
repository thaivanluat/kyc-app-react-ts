import { createContext, useContext } from "react"
import { User } from "../interfaces/user.interface"
import { Review } from "../interfaces/review.interface"

type AppContextType = {
    users: User[],
    reviews: Review[]
    getUserById: (id: any) => User|undefined
    getUsers: () => User[],
    updateUser: (data: any) => void
    getReviews: () => Review[],
    getReviewById: (id: number|string) => Review |undefined,
    updateReview: (data: any) => void,
    createReview: (data: any) => void,
    approveReview: (reviewId: string|number) => void,
    rejectReview: (reviewId: any) => void
}

export const AppContext = createContext({} as AppContextType)

export function useAppContext() {
    return useContext(AppContext)
}