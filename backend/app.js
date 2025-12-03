import express from "express";
import  dbConnection  from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
//“ config Load my secret variables from this file so I can use process.env.”
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";

config({ path: "./.env" });//calling again in main file bcz load it globally its recommended
const app = express();
app.use(cookieParser());
app.use(express.json());

 app.use("/api/v1/user", userRouter);
 app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);


  dbConnection();
export default app;