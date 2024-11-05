const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    try {
        // Lấy token từ cookie hoặc header
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

        // Kiểm tra nếu không có token
        if (!token) {
            return res.status(401).json({
                message: "User isn't logged in",
                error: true,
                success: false
            });
        }

        // Xác thực token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                return res.status(403).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false
                });
            }

            // Lưu thông tin người dùng đã giải mã vào request để sử dụng cho các middleware khác
            req.user = decoded;
            next(); // Cho phép tiếp tục middleware tiếp theo
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
