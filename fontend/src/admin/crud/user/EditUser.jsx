import React, { useState, useEffect } from 'react';
import Role from '../../../common/role';
import SummaryApi from '../../../common/helper';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export const EditUser = ({ user, onClose, onUpdate, isOpen, callFunc }) => {
    const [updatedRole, setupdatedRole] = useState(user?.role || "");
    const [updatedName, setUpdatedName] = useState(user?.name || "");
    const [updatedEmail, setUpdatedEmail] = useState(user?.email || "");
    const [updatedPassword, setUpdatedPassword] = useState(user?.password || "");

    useEffect(() => {
        if (isOpen && user) {
            setupdatedRole(user.role);
            setUpdatedName(user.name);
            setUpdatedEmail(user.email);
            setUpdatedPassword(user.password);
        }
    }, [isOpen, user]);

    const handleOnChangeSelect = (e) => {
        setupdatedRole(e.target.value);
    };

    const updateUser = async () => {
        const updatedUser = {
            userId: user?._id, // Lấy ID từ user object
            name: updatedName,
            email: updatedEmail,
            role: updatedRole,
            password : updatedPassword
        };

        try {
            const fetchData = await fetch(SummaryApi.update_user.url, {
                method: SummaryApi.update_user.method,
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser) // Truyền đúng cấu trúc
            });

            const responseData = await fetchData.json();
            console.log("User being updated:", responseData);

            if (responseData.success) {
                onUpdate(updatedUser);
                toast.success("User is updated");
                callFunc();
                onClose(); // Đóng chỉ khi thành công
            } else {
                toast.error("Failed to update user");
            }

        } catch (error) {
            toast.error("An error occurred while updating the user");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 top-4 md:inset-0 h-modal">
            <div className="relative w-full max-w-2xl p-4 bg-white rounded-lg shadow dark:bg-gray-800">
                <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                    <h3 className="text-xl font-semibold dark:text-white">Edit User</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <FontAwesomeIcon icon={faClose} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <form onSubmit={(e) => { e.preventDefault(); updateUser(); }}>
                        <div className="grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input
                                    type="text"
                                    id="first-name"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={updatedEmail}
                                    onChange={(e) => setUpdatedEmail(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="text"
                                    id="password"
                                    value={updatedPassword}
                                    onChange={(e) => setUpdatedPassword(e.target.value)}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Role</label>
                                <select
                                    onChange={handleOnChangeSelect}
                                    value={updatedRole}
                                    id="role"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                >
                                    {Object.values(Role).map((role) => (
                                        <option value={role} key={role}>{role}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="flex justify-end p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={updateUser}
                    >
                        Save all
                    </button>
                </div>
            </div>
        </div>
    );
};
