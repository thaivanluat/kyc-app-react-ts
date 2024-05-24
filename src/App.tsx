import React from 'react';
import './App.css';
import {RouterProvider, } from "react-router";
import appRouter from "./app.router";
import {AuthenticatedProvider} from "./shared/context/Authenticated";
import { AppContextProvider } from './shared/context/AppContext';

function App() {
    return (
        <AuthenticatedProvider>
            <AppContextProvider>
                <RouterProvider router={appRouter} />
            </AppContextProvider>
        </AuthenticatedProvider>
    )
}

export default App;
