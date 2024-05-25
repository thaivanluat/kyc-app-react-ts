import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticatedContext, useAuth } from "../../shared/context/Authenticated";

const Header = () => {
    const [isOpenDropDown, setIsOpenDropDown] = useState<boolean>(false);
    const { user, logout } = useAuth();
    const links: Array<Record<string, string>> = [];
    const navigate = useNavigate();

    const onSignOut = () => {
        logout();
        navigate('/pages/auth/login')
    }

    return (
        <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button id="toggleSidebarMobile" aria-expanded="true" aria-controls="sidebar" className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                            <svg id="toggleSidebarMobileHamburger" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg id="toggleSidebarMobileClose" className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                        <a href="/" className="flex ml-2 md:mr-24">
                            <img src="/logo.png" className="h-8 mr-3" alt="FlowBite Logo" />
                            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Simple KYC</span>
                        </a>
                    </div>
                    {
                        user ? (
                            <div className="flex items-center">
                                <div className="flex items-center ml-3">
                                    <div>
                                        <button type="button"
                                            onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                            id="user-menu-button-2" aria-expanded="true"
                                            data-dropdown-toggle="dropdown-2">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="w-8 h-8 rounded-full"
                                                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                alt="user photo" />
                                        </button>
                                    </div>

                                    <div
                                        className={`z-50 ${isOpenDropDown ? '' : 'hidden'} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                                        id="dropdown-2" data-popper-placement="bottom" style={{
                                            position: "absolute",
                                            margin: "0px",
                                            top: "55px",
                                            right: "15px"
                                        }}>
                                        <div className="px-4 py-3" role="none">
                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                                role="none">
                                                {user.email}
                                            </p>
                                        </div>
                                        <ul className="py-1" role="none">
                                            <li>
                                                <Link
                                                    to={`/pages/user/${user.id}/pi`}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem"
                                                >
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="#"
                                                    onClick={onSignOut}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    role="menuitem">Sign out</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    }

                </div>
            </div>
        </nav>
    )
}

export default Header