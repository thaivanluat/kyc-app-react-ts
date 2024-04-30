import {Link} from "react-router-dom";
import React, {ReactElement} from "react";
interface MenuItem {
    name: string;
    link: string;
    icon: string
}
const Sidebar = () => {
    const menuItems: MenuItem[] = [
        {
            name: 'Example',
            link: "#",
            icon: '/icons/settings.svg'
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
                                menuItems.map((item: any) => (
                                    <li>
                                        <Link to={item.url}
                                           className="flex items-center p-2 text-base text-gray-900 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700">
                                            <img className="h-8 mr-3" src={item.icon}/>
                                            <span className="ml-3" sidebar-toggle-item="">{item.name}</span>
                                        </Link>
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