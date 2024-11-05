const userModel = require("../../models/userModel")

async function userDetailController(req, res) {
    try {
        const user = await userModel.findById(req.user._id)

        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "user details"
        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            success: false,
            error : true
        })
    }
}

module.exports = userDetailController