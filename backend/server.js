const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

// Connect to database
connectDB();

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/foodImgs"));
app.use(express.static(__dirname + "/userImgs"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// routes
app.use("/users", require("./routes/userRoutes"));
app.use("/fooditems", require("./routes/fooditemsRoutes"));
app.use("/cart", require("./routes/cartRouter"));
app.use("/order", require("./routes/orderRouter"));
app.use("/announcement", require("./routes/announcementRouter"));
app.use(require("./routes/otpRouter"));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
