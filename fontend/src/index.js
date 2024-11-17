import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { store } from './store/store';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { AdminPanel } from './admin/AdminPanel';
import { AllUsers } from './admin/AllUsers';
import { AllProducts } from './admin/AllProducts';
import { AddProduct } from './admin/crud/product/AddProduct';
import { EditProduct } from './admin/crud/product/EditProduct';
import AllCategries from './admin/AllCategory';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path : "/home",
        element : <Home />
      },
      {
        path : "/login",
        element : <Login/>
      },
      {
        path : "/SignUp",
        element : <SignUp/>
      },
      {
        path: "/admin-panel",
        element: <AdminPanel/>,
        children : [
          {
            path: "all-users",
            element: <AllUsers/>
          },
          {
            path: "category",
            element : <AllCategries />
          },
          {
            path: "products",
            children : [
              {
              path: "product-list",
              element : <AllProducts />
              },
              {
                path: "add-products",
                element: <AddProduct />
              },
              {
                path: "edit-products",
                element: <EditProduct />  
              }
            ]
          },
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);