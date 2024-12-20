import React, { useEffect, useState } from 'react';
import axios from "axios";
import SummaryApi from '../../../common/helper';
import { toast } from 'react-toastify';

export const DeleteUser = ({ user, onClose, onUpdate, isOpen, callFunc }) => {
    const [deleteUser , setDeleteUser] = useState(user?._id || "");

    useEffect(() => {
        if (isOpen && user) {
            setDeleteUser(user?._id);
        }
    }, [isOpen, user]);

    const deletedUser  = async () => {
        const deleteUserPayload  = {
            userId: user?._id
        };
        try {
            const response = await axios({
                url: SummaryApi.delete_user.url,
                method: SummaryApi.delete_user.method,
                withCredentials: "true",
                headers : {
                    "Content-Type" : "application/json",
                },
                data: deleteUserPayload
            });
    
            const responseData = response.data;
            console.log("User being deleted:", responseData);
    
            if (responseData.success) {
                onUpdate(deleteUser);
                toast.success("User  deleted successfully");
                callFunc();
                onClose();
            }
            if (responseData.error) {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast.error("An error occurred while deleting the user");
        }
    };


    return (
        <div>
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div class="relative w-full h-full max-w-md px-4 md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        {/* <!-- Modal header --> */}
                        <div class="flex justify-end p-2">
                            <button type="button" onClick={onClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-hide="delete-user-modal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div class="p-6 pt-0 text-center">
                            <svg class="w-16 h-16 mx-auto text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 class="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
                            <button type='button' onClick={deletedUser} class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800">
                                Yes, I'm sure
                            </button>
                            <a href="#" onClick={onClose} class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700" data-modal-hide="delete-user-modal">
                                No, cancel
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
