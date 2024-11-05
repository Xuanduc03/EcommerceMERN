import React, { useState } from 'react';
import { toast } from 'react-toastify';
import SummaryApi from '../../common/helper';
import Role from '../../common/role';

export const AddUser = ({onClose, callFunc }) => {
    const [addData, setAddData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const handleChangeData = (e) => {
        const { name, value } = e.target;

        setAddData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const fetchData = await fetch(SummaryApi.add_user.url, {
                method: SummaryApi.add_user.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(addData)
            });

            const responseData = await fetchData.json();

            if (responseData.success) {
                toast.success("Add user successful");
                callFunc();
                onClose();
            }
            if (responseData.error) {
                toast.error(responseData.message);
            }
        } catch (error) {
            toast("Can't add user!");
        }
    }

    return (
        <div>
            {/* <!-- Add User Modal --> */}
            <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 top-4 md:inset-0 h-modal" id="add-user-modal">
                <div class="relative w-full h-full max-w-2xl px-4 md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-800">
                        {/* <!-- Modal header --> */}
                        <div class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                            <h3 class="text-xl font-semibold dark:text-white">
                                Add new user
                            </h3>
                            <button type="button" onClick={onClose} class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white" data-modal-toggle="add-user-modal">
                                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div class="p-6 space-y-6">
                            <form action="#" method="POST" onSubmit={handleSubmit}>
                                <div class="grid grid-cols-6 gap-6">
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={addData.name}
                                            onChange={handleChangeData}
                                            id="name"
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Bonnie" required />
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input
                                            type="text"
                                            name="email"
                                            value={addData.email}
                                            onChange={handleChangeData}
                                            id="email"
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="user@gmail.com" required />
                                    </div>
                                    <div class="col-span-6 sm:col-span-3">
                                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={addData.password}
                                            onChange={handleChangeData}
                                            id="password"
                                            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="123456" required />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label for="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Role</label>
                                        <select
                                            onChange={handleChangeData}
                                            name='role'
                                            value={addData.role}
                                            id="role"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        >
                                            {Object.values(Role).map((role) => (
                                                <option value={role} key={role}>{role}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div class="col-span-6">
                                        <label for="biography" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Biography</label>
                                        <textarea id="biography" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="👨‍💻Full-stack web developer. Open-source contributor."></textarea>
                                    </div>
                                </div>
                                {/* <!-- Modal footer --> */}
                                <div class="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                                    <button type="submit" class="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add user</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
