import express from 'express';
import db from "./config/mongoose-connection.js"
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/userRouter.js";

dotenv.config();

const app = express();

const port = process.env.PORT

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/user",userRouter);



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})




