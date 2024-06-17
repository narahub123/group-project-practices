import express from "express";
import mongoose from "mongoose";
import userRoutes from "../api/routes/user.route.js";
import authRoutes from "../api/routes/auth.route.js";
import dotenv from "dotenv";
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

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
