import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import chatRoutes from './routes/chat.route.js'

import { connectDB } from './lib/db.js';



const app = express();
const PORT = process.env.PORT;

app.use(express.json())  //to get the data in json format from the request body
app.use(cookieParser()) //to parse the cookies from the request
app.use(express.urlencoded({ extended: true })); // parse form data

app.use('/api/auth', authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/chat',chatRoutes);

app.get("/",(req,res) =>{
    res.send("Hello world! from backend")
})

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})