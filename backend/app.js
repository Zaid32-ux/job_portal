import express from "express";
import  dbConnection  from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
//“ config Load my secret variables from this file so I can use process.env.”
import { config } from "dotenv";

config({ path: "./.env" });//calling again in main file bcz load it globally its recommended
const app = express();
app.use(cookieParser());
app.use(express.json());

// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/job", jobRouter);
// app.use("/api/v1/application", applicationRouter);

  dbConnection();
export default app;