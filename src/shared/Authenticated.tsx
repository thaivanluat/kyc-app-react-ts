import {createContext, ReactElement} from "react";

interface User {
    name: string;
    email: string;
}

const fakeUser = {
    name: "Neo Amstrong",
    email: "neo.amstrong@notarealmail.com"
}

const AuthenticatedContext = createContext<User|null>(null);

const AuthenticatedProvider = ({children}: {children: ReactElement}) => {
    return (<AuthenticatedContext.Provider value={fakeUser}>{children}</AuthenticatedContext.Provider>)
}

export { AuthenticatedProvider, AuthenticatedContext};