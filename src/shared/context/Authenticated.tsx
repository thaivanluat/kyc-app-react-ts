import { createContext, ReactElement, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData from '../../data/users.json';
import { Role } from '../interfaces/user.interface';
import { useLocalStorage } from '../hook/useLocalStorage';

interface User {
    id: number,
    email: string;
    password: string;
    role: string;
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => User | null;
    logout: () => void;
}

const AuthenticatedContext = createContext<AuthContextProps | undefined>(undefined);

const AuthenticatedProvider = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') as string));

    const login = (email: string, password: string): User | null => {
        const foundUser = usersData.users.find(
            (user: User) => user.email === email && user.password === password
        );

        if (foundUser) {
            setUser(foundUser)
            localStorage.setItem('user', JSON.stringify(foundUser));
        } 

        return foundUser || null;
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthenticatedContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthenticatedContext.Provider>
    );
};

const useAuth = (): AuthContextProps => {
    const context = useContext(AuthenticatedContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthenticatedProvider');
    }
    return context;
};

export { AuthenticatedProvider, AuthenticatedContext, useAuth };