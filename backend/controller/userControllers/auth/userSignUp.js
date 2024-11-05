const userModel = require("../../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // Kiểm tra người dùng có tồn tại không
        const user = await userModel.findOne({ email });

        if (user) {
            throw new Error("User already exists");
        }

        // Kiểm tra nếu thiếu email, password hoặc name
        if (!email) {
            throw new Error("Please provide email");
        }
        if (!password) {
            throw new Error("Please provide password");
        }
        if (!name) {
            throw new Error("Please provide name");
        }

        // Băm mật khẩu
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong with password hashing");
        }


        // Tạo payload mới với mật khẩu đã băm
        const payload = {
            ...req.body,
            role: "CLIENT",
            password: hashPassword
        };

        // Lưu thông tin người dùng mới vào database
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        // Trả về phản hồi thành công
        res.status(200).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully"
        });
    } catch (error) {
        res.json({
            message: error.message || error, // Sử dụng error.message để trả về thông báo lỗi cụ thể
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
