import express from "express";
import  dbConnection  from "./database/dbConnection.js";
import cookieParser from "cookie-parser";
//“ config Load my secret variables from this file so I can use process.env.”
import { config } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import fileUpload from "express-fileupload";
import cors from "cors";

config({ path: "./.env" });//calling again in main file bcz load it globally its recommended
const app = express();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


 app.use("/api/v1/user", userRouter);
 app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);


  dbConnection();
export default app;