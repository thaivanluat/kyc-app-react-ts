import { Link, NavLink, useLocation } from "react-router-dom";
import React, { ReactElement } from "react";
import { useAuth } from "../../shared/context/Authenticated";
import { Role } from "../../shared/interfaces/user.interface";
interface MenuItem {
    name: string;
    url: string;
}
const Sidebar = () => {
    const { user } = useAuth();
    const menuItems: MenuItem[] = [

        {
            name: `User`,
            url: `user/`,
        },
        {
            name: `Pending Review`,
            url: `review/pending-review`,
        },
        {
            name: `Completed Review`,
            url: `review/completed-review`,
        }
    ];
    return (
        <aside id="sidebar"
            className="fixed top-0 left-0 z-20 flex flex-col flex-shrink-0 hidden w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width"
            aria-label="Sidebar">
            <div
                className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div
                        className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        <ul className="pb-2 space-y-2">
                            {
                                user?.role === Role.OFFICER && menuItems.map((item: any, index: any) => (
                                    <li key={index}>
                                        <NavLink
                                            end
                                            to={item.url}
                                            className={({ isActive }) => {
                                                return `hover:font-bold flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700 ${isActive ? 'font-bold' : ''}`
                                            }
                                            }

                                        >
                                            <span className="ml-3" sidebar-toggle-item="">{item.name}</span>
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar