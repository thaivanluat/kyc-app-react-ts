import { Link, useNavigate } from "react-router-dom";

const PermissionDenied = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-red-500 mb-8">Permission Denied</h1>
            <p className="text-gray-700 text-lg">
                You do not have permission to access this page.
            </p>
            <button
                onClick={() => navigate(-1)}
                className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-sm">
                Go Back
            </button>
        </div>
    )
}

export default PermissionDenied;