import { ReactElement, useContext, useEffect, useState } from "react";
import { Role, User } from "../interfaces/user.interface";
import usersData from '../../data/users.json';
import reviewData from '../../data/reviews.json'
import { Review, ReviewStatus } from "../interfaces/review.interface";
import { AppContext } from "../hook/useAppContext";
import { useLocalStorage } from "../hook/useLocalStorage";
import { v4 as uuidv4 } from 'uuid';

interface AppContextProp {
    users: User[];
    reviews: Review[];
}
const AppContextProvider = ({ children }: { children: ReactElement }) => {
    const [users, setUsers] = useLocalStorage<User[]>("users", []);
    const [reviews, setReviews] = useLocalStorage<Review[]>("reviews", []);

    useEffect(() => {
        const loadData = async () => {
            if (!JSON.parse(localStorage.getItem('users') as string)?.length) {
                const userJson = usersData.users;
                localStorage.setItem('users', JSON.stringify(userJson));
                console.log("init data for users");
            }

            if (!JSON.parse(localStorage.getItem('reviews') as string)?.length) {
                const reviewJson = reviewData.reviews;
                localStorage.setItem('reviews', JSON.stringify(reviewJson));
                console.log("init data for reviews");
            }
        };

        loadData();
    }, []);

    function getUserById(id: any) {
        const foundUser = users.find(
            (user: User) => user.id == id
        );

        return foundUser
    }

    function getUsers(): User[] {
        return users.filter(
            (user) => user.role !== Role.OFFICER
        );
    }

    function getReviews(): Review[] {
        return reviews;
    }

    function updateUser(data: any): void {
        setUsers(users.map(user => {
            if (user.id === data.id) {
                return { ...user, ...data }
            } else {
                return user;
            }
        }));
    }

    function getReviewById(id: any) {
        const review = reviews.find(
            (review: Review) => review.id == id
        );

        return review
    }

    function updateReview(data: any) {

    }

    function getCurrentDate() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }

    function createReview(data: any) {
        const newReview = {
            id: uuidv4(),
            user: users.find(user => user.id == data.userId),
            date: getCurrentDate(),
            status: ReviewStatus.Pending,
            financial_status: data.financial_status
        }
        setReviews([...reviews, newReview]);
    }

    function approveReview(reviewId: any) {
        setReviews(reviews.map(review => {
            if (review.id === reviewId) {
                review.status = ReviewStatus.Approved
                return review
            } else {
                return review;
            }
        }));
    }

    function rejectReview(reviewId: any) {
        setReviews(reviews.map(review => {
            if (review.id === reviewId) {
                review.status = ReviewStatus.Rejected
                return review
            } else {
                return review;
            }
        }));
    }

    return (
        <AppContext.Provider value={{
            users: users,
            reviews: reviews,
            getUserById,
            getUsers,
            getReviews,
            updateUser,
            getReviewById,
            updateReview,
            createReview,
            approveReview,
            rejectReview
        }}>{children}</AppContext.Provider>
    );
}

const useStore = (): AppContextProp => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useStore must be used within an AppContextProvider');
    }
    return context;
};


export { AppContextProvider, useStore };