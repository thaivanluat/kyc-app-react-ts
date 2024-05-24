import { ReactElement, useContext, useEffect, useState } from "react";
import { Role, User } from "../interfaces/user.interface";
import usersData from '../../data/users.json';
import reviewData from '../../data/reviews.json'
import { Review } from "../interfaces/review.interface";
import { AppContext } from "../hook/useAppContext";
import { useLocalStorage } from "../hook/useLocalStorage";

interface AppContextProp {
    users: User[];
    reviews: Review[];
}
const AppContextProvider = ({ children }: { children: ReactElement }) => {
    const [users, setUsers] = useLocalStorage<User[]>("users", []);
    const [reviews, setReviews] = useLocalStorage<Review[]>("reviews", []);

    useEffect(() => {
        const loadData = async () => {
            const userJson = usersData.users;
            const reviewJson = reviewData.reviews;

            localStorage.setItem('users', JSON.stringify(userJson));
            localStorage.setItem('reviews', JSON.stringify(reviewJson));
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

    function createReview(data: any) {
        console.log(data);
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
            createReview
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