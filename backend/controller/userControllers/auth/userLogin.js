const userModel = require("../../../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function userLoginController(req, res) {
    try {
        const { email, password } = req.body; // Lấy dữ liệu từ req.body

        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }

        const userData = await userModel.findOne({ email });

        if (!userData) {
            throw new Error("User is not available");
        }

        const checkPassword = await bcrypt.compare(password, userData.password);

        if (checkPassword) {
            const tokenData = {
                _id: userData.id,
                email: userData.email
            };
            const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true
            };

            res.cookie("token", token, tokenOption).json({
                message: "Login successful",
                data: token,
                success: true,
                error: false
            });
        } else {
            throw new Error("Invalid password");
        }

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = userLoginController;
