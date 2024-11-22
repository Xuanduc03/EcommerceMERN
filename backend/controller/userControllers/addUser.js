const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function AddUserController(req, res) {
    try {
        const {email, name, password, role} = req.body;

        if (!email || !name || !role || !password) {
            return res.status(400).json({
                message: "Name, email, password is invalid",
                success: false,
                error: true
            })
        }
        // Băm mật khẩu
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        const existingUser = await userModel.findOne({email});

        if(existingUser) {
            return res.status(200).json({
                message: "User already exists",
                success: true,
                error: false
            })
        }
        
        const payLoad = {
            ...req.body,
            password: hashPassword
        }

        const newUser = new userModel(payLoad);
        const savedUser = await newUser.save();

        console.log(savedUser);
        res.status(200).json({
            data: savedUser,
            message: "Add User is successful",
            success: true,
            error: false
        })

        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error : true
        })
    }
}

module.exports = AddUserController