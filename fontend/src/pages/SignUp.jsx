import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/helper';
import { toast } from 'react-toastify';

export default function SignUp() {
    // Sử dụng useState để quản lý trạng thái của form với hai trường email và password
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: ""
    });
    const navigate = useNavigate()

    // Hàm này sẽ được gọi khi người dùng nhập dữ liệu vào các input field
    const handleOnChange = (e) => {
        const { name, value } = e.target; // Lấy tên và giá trị của input (name tương ứng với email hoặc password)

        // Cập nhật trạng thái (state) với giá trị mới mà người dùng nhập vào
        setData((preve) => {
            return {
                ...preve,        // Sao chép toàn bộ dữ liệu hiện tại của state (để không ghi đè các giá trị khác)
                [name]: value,   // Cập nhật giá trị mới cho field tương ứng (email hoặc password)
            }
        });
    };

    // Hàm này sẽ được gọi khi form được submit
    const handleSubmit = async (e) => {
        e.preventDefault();  // Ngăn không cho trang web reload lại khi form được submit

        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match!");  // Hiển thị cảnh báo nếu mật khẩu không khớp
            return;  // Dừng lại không gửi yêu cầu nếu mật khẩu không khớp
        }

        try {
            // Gửi dữ liệu đến server
            const response = await fetch(SummaryApi.SignUp.url, {
                method: SummaryApi.SignUp.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)  // Chuyển dữ liệu state thành JSON
            });

            const result = await response.json();  // Chờ kết quả trả về từ server và chuyển thành JSON
            if (result.success) {
                toast.success(result.message);
                navigate("/login")
            }
            if (result.error) {
                toast.error(result.message)
            }

        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        //html dang ky tai khoan
        <section id='signup'>

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img src="https://cdn.worldvectorlogo.com/logos/mclaren-racing-logo.svg" alt="" />
                    <h2 className="mt-10 italic text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">SignUp Now</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* handle submit */}
                    <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                        {/* input name value*/}
                        <div>
                            <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
                            <div className="mt-2">
                                <input id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={handleOnChange}
                                    type="text"
                                    required className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 
                     shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                     focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        {/* input email value */}
                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleOnChange}
                                    type="email"
                                    autocomplete="email"
                                    required className="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 
                     shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                     focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>


                        {/* input password */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleOnChange}
                                    type="password"
                                    autocomplete="current-password"
                                    required className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                     ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                     sm:text-sm sm:leading-6" />
                            </div>
                        </div>

                        {/* input password again */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label for="password2" className="block text-sm font-medium leading-6 text-gray-900">Submit Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="confirmPassword"
                                    name="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={handleOnChange}
                                    type="password"
                                    autocomplete="current-password"
                                    required className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                     ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                     sm:text-sm sm:leading-6" />
                            </div>
                        </div>


                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SignUp</button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Have an account
                        <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-yellow-400"> Login</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
