import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js";
dotenv.config({});

connectDB();
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions));

//apis

app.use("api/v1/user", userRoute);


app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`);
})


