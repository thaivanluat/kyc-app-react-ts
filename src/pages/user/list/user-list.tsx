import { Link } from "react-router-dom";
import { User } from "../../../shared/interfaces/user.interface";
import { useAppContext } from "../../../shared/hook/useAppContext";

const UserList = () => {
    let users = useAppContext().getUsers();

    const getFullName = (user: any) => {
        return `${user.first_name} ${user.middle_name || ''} ${user.last_name}`;
    };

    return (
        <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
            <div className="mb-4 col-span-full xl:mb-2">
                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                        <li className="inline-flex items-center">
                            <a href="#"
                                className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                </svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <a href="#"
                                    className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white">Users</a>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500"
                                    aria-current="page">User List</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">User List</h1>
            </div>
            <div
                className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
                <table className="table-auto w-full rounded-lg shadow">
                    <thead className="text-left bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 font-medium text-gray-700">ID</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Email</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Full Name</th>
                            <th className="px-4 py-2 font-medium text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 text-gray-700">{user.id}</td>
                                <td className="px-4 py-2 text-gray-700">{user.email}</td>
                                <td className="px-4 py-2 text-gray-700">{getFullName(user)}</td>

                                <td className="px-4 py-2">
                                    <Link to={`/pages/user/${user.id}/pi`}>
                                        <button className="inline-flex items-center px-3 py-2 rounded-full text-xs font-medium text-white bg-green-500 hover:bg-green-700">
                                            Select
                                        </button>
                                    </Link>
                                </td>
                            </tr>))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList;