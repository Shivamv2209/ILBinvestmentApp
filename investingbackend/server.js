import express from 'express';
import db from "./config/mongoose-connection.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT



db().then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
})




