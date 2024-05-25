import { useAuth } from "../../shared/context/Authenticated";
import { useAppContext } from "../../shared/hook/useAppContext";
import NotFound from "../common/not-found";

const HomeComponent = () => {
    const { getUserById } = useAppContext();
    let { user } = useAuth();
    let displayUser = getUserById(user?.id)

    return (
        <div className="flex flex-col min-h-screen justify-center items-center bg-white">
            <h1 className="text-4xl font-bold text-gray-800">Hello { `${displayUser?.first_name} ${displayUser?.middle_name || ''} ${displayUser?.last_name}` }</h1>
        </div>
    )
}   

export default HomeComponent;