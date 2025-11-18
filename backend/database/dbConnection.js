import mongoose from "mongoose"; //just mongoose import!
import dotenv from "dotenv"
dotenv.config()
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.3eexpys.mongodb.net/moviesverse?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(dbLink);
 const dbConnection  = ()=>{
mongoose.connect(dbLink)
    .then(function (connection) {
        console.log("connected to db")
    }).catch(err => console.log(err))
 }
export default dbConnection;