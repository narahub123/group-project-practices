import express from "express";
import mongoose from "mongoose";
import userRoutes from "../api/routes/user.route.js";
import authRoutes from "../api/routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

// connect to mongodb
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoBD");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
