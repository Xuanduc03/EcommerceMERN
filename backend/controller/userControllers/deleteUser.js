const userModel = require("../../models/userModel");

async function DeleteUserController(req, res) {
    try {
        const { userId } = req.body;

        const payLoad = {
            ...(userId && { userId }),
        };

    
        const user = await userModel.findById(userId); // Tìm người dùng theo userId

        if (!user) {
            return res.status(404).json({
                message: "Người dùng không tồn tại.",
                error: true,
                success: false
            });
        }

        const deleteUser = await userModel.findByIdAndDelete(userId, payLoad, {new : true});

        if(!deleteUser) {
            return res.status(400).json({
                message: "Can't delete user",
                error: true,
                success : false
            })
        }

        return res.status(200).json({
            message : "User deleted successful",
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || "Có lỗi xảy ra.",
            error: true,
            success: false
        });
    }
}

module.exports = DeleteUserController