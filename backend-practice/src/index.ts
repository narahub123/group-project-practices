import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";

import router from "./routers";

const app = express();

const ip = "172.16.1.82";

app.use(
  cors({
    origin: [
      `http://${ip}:3000`,
      "http://localhost:3000",
      "https://tripitnow.netlify.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});

const MONGO_URL =
  "mongodb+srv://john:1234@nodeexpressproject.viwrjth.mongodb.net/?retryWrites=true&w=majority&appName=NodeExpressProject";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());
