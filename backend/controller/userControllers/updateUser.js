const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function UpdateUserController(req, res) {
    try {
        const { userId, email, name, password, role } = req.body;

        const payLoad = {
            ...(email && { email }),
            ...(name && { name }),
            ...(role && { role })
        };

        if(password){
              // Băm mật khẩu
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            payLoad.password = hashPassword;
        }

        const user = await userModel.findById(userId); // Tìm người dùng theo userId
        if (!user) {
            return res.status(404).json({
                message: "Người dùng không tồn tại.",
                error: true,
                success: false
            });
        }

        const updateUser = await userModel.findByIdAndUpdate(userId, payLoad, { new: true }); // Cập nhật người dùng và trả về dữ liệu sau khi cập nhật
        console.log(updateUser)
        res.status(200).json({
            data: updateUser,
            message: "User is updated",
            success: true,
            error: false
        });

    } catch (error) {
            res.status(400).json({
                message: error.message || "Có lỗi xảy ra.",
                error: true,
                success: false
            });
    }
}

module.exports = UpdateUserController;
