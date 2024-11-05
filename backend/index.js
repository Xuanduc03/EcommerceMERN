const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/router");

const app = express();

// Sử dụng cors
app.use(cors({
    origin : process.env.FONTEND_URL,
    credentials: true 
}));

// Middleware để parse JSON từ request body
app.use(express.json());

app.use(cookieParser());

// Sử dụng router
app.use('/api', router);

// Định nghĩa cổng
const PORT = process.env.PORT || 8080;

// Kết nối đến cơ sở dữ liệu và khởi động server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("Failed to connect to database", err);
});
