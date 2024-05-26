import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import { Navigate, Outlet, useNavigate } from "react-router";
import Footer from "../components/footer/footer";
import {  useAuth } from "../shared/context/Authenticated";
import { Role } from "../shared/interfaces/user.interface";
const Pages = () => {
    const { user } = useAuth();

    if(!user) {
        return <Navigate to="/auth/login" />
    }

    return (
        <>
            <Header />
            <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                <Sidebar />
                <div id="main-content"
                    className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
                    <main>
                        <Outlet></Outlet>
                        <Footer />
                    </main>
                </div>
            </div>
        </>
    )
}

export default Pages