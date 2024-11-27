const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

