const userModel = require("../../models/userModel");

async function AllUsersController(req, res) {
    try {
        const allUser = await userModel.find()

        res.status(200).json({
            message: "all users is here",
            data: allUser,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = AllUsersController