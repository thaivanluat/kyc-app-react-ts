import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import {Outlet} from "react-router";
import Footer from "../components/footer/footer";
import {AuthenticatedContext, useAuth} from "../shared/context/Authenticated";
import Login from "./auth/login/Login";
const Pages = () => {
    const { user } = useAuth();

    return (
        <>
            { user ? (
                <>
                    <Header/>
                    <div className="flex pt-16 overflow-hidden bg-gray-50 dark:bg-gray-900">
                        <Sidebar/>
                        <div id="main-content"
                            className="relative w-full h-full overflow-y-auto bg-gray-50 lg:ml-64 dark:bg-gray-900">
                            <main>
                                <Outlet></Outlet>
                                <Footer/>
                            </main>
                        </div>
                    </div>
                </>
            ) : <Login></Login>
            }
        </>
    )
}

export default Pages