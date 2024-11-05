const express = require("express");

const router = express.Router();

const userSignUpController = require("../controller/userControllers/auth/userSignUp");
const userLoginController = require("../controller/userControllers/auth/userLogin");
const userDetailController = require("../controller/userControllers/userDetail");
const authToken = require("../middleware/authToken");
const userLogout = require("../controller/userControllers/auth/userLogout");
const AllUsersController = require("../controller/userControllers/allUsers");
const UpdateUserController = require("../controller/userControllers/updateUser");
const DeleteUserController = require("../controller/userControllers/deleteUser");
const AddUserController = require("../controller/userControllers/addUser");
const AddProductController = require("../controller/productControllers/addProduct");
const AllProductController = require("../controller/productControllers/allProduct");
const DeleteProductController = require("../controller/productControllers/deleteProduct");

router.post('/signup', userSignUpController);
router.post('/login', userLoginController);
router.get('/user-details',authToken, userDetailController);
router.get('/userLogout', userLogout );

// admin panel router

// crud user
router.get('/all-users',authToken, AllUsersController);
router.put('/update-user',authToken , UpdateUserController);
router.delete('/delete-user',authToken, DeleteUserController);
router.post('/add-users', AddUserController);

//crud product
router.post('/add-products', AddProductController);
router.get('/product-list', authToken, AllProductController);
router.delete('/delete-product', DeleteProductController);

module.exports = router