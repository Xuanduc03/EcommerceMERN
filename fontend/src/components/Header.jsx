import React, { useState } from 'react';
import Logo from './Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common/helper';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';

export default function Header() {
    const user = useSelector(state => state?.user?.user);  // Lấy user từ Redux store
    const dispatch = useDispatch();
    const [isDropdownOpen, setDropdownOpen] = useState(false); 

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: 'include'
        });

        const data = await fetchData.json();

        if (data.success) {
            toast.success("User is logout");
            dispatch(setUserDetails(null));
        }
        if (data.error) {
            toast.error("User isn't logout");
        }
    };

    // Toggle dropdown visibility
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <header className='h-16 shadow-md bg-white'>
            <div className='h-full container mx-auto flex items-center px-4 justify-between'>
                <Link to={'/home'} className='pl-8'>
                    <Logo w={90} h={60} />
                </Link>

                <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow'>
                    <input className='w-full pl-2 outline-none' type='text' placeholder='Please enter your product!' />
                    <div className='text-lg min-w-[50px] h-8 bg-black flex items-center justify-center rounded-r-full cursor-pointer'>
                        <FontAwesomeIcon className='text-white' icon={faSearch} />
                    </div>
                </div>

                <div className='pr-8 flex items-center gap-7'>
                    {/* User Icon with Dropdown */}
                    <div className='relative'>
                        <div className='text-3xl cursor-pointer' onClick={toggleDropdown}>
                            <FontAwesomeIcon icon={faUserCircle} />
                        </div>

                        {/* Dropdown */}
                        {isDropdownOpen && (
                            <div className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div>{user?.name}</div>
                                    <div className="font-medium truncate">{user?.email}</div>
                                </div>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        {
                                            user?.role === "ADMIN" && (
                                                <Link to="/admin-panel" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                            )
                                        }

                                    </li>
                                    <li>
                                        <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</Link>
                                    </li>
                                    <li>
                                        <Link to="/earnings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Shopping Cart Icon */}
                    <div className='text-2xl cursor-pointer relative'>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <div className='bg-black w-5 p-1 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                            <span className='text-lg text-white'>0</span>
                        </div>
                    </div>

                    {/* Login/Logout Button */}
                    <div>
                        {
                            user?._id ? (
                                <button onClick={handleLogout} className='px-3 py-1 bg-black text-white rounded-xl'>Logout</button>
                            ) : (
                                <Link to="/login" className='px-3 py-1 bg-black text-white rounded-xl'>Login</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </header>
    );
}
