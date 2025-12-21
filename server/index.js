const express = require("express");
const app = express();
require("dotenv").config();

const routes = require("./routes/routes");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
const cors = require("cors");

const PORT = process.env.PORT || 8000;

// ✅ connect to db
database.connectToDB();

// ✅ CORS FIRST
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ preflight support
app.options("*", cors());

// ✅ body + cookies
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Your server is up and running...",
  });
});

app.use("/api/v1", routes);

// ✅ start server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
