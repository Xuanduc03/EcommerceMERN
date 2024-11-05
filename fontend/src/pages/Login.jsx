import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/helper';
import { toast } from 'react-toastify';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

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
    // Thực hiện các hành động khác khi form submit (như gửi dữ liệu lên server hoặc kiểm tra tính hợp lệ)
    const dataResponse = await fetch(SummaryApi.Login.url, {
      method: SummaryApi.Login.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success("User is login success")
      navigate('/home')
    } if (dataApi.error) {
      toast.error("User is not valid")
    }
  };

  return (
    <section id='login'>
      <form action="" method="post">

      </form>
      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
          <img class="mx-auto h-10 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Lamborghini_-_logo_wordmark_%28italy%2C_1963-%29.svg/1280px-Lamborghini_-_logo_wordmark_%28italy%2C_1963-%29.svg.png" alt="Your Company" />
          <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div class="mt-2">
                <input id="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  type="email"
                  autocomplete="email"
                  required class="block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900 
                     shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                     focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div class="text-sm">
                  <a href="" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div>
              </div>
              <div class="mt-2">
                <input id="password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  type="password"
                  autocomplete="current-password"
                  required class="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                     ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                     sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
            </div>
          </form>

          <p class="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link to={"/SignUp"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Login;