import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js';



const app = express();
const PORT = process.env.PORT;

app.use(express.json())  //to get the data in json format from the request body
app.use(cookieParser()) //to parse the cookies from the request
app.use(express.urlencoded({ extended: true })); // parse form data

app.use('/api/auth', authRoutes);

app.get("/",(req,res) =>{
    res.send("Hello world! from backend")
})

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})