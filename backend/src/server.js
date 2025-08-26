import express from 'express'
// import dotenv from 'dotenv'
// dotenv.config();
// or
import 'dotenv/config'
import authRoutes from './routes/auth.route.js'
import { connectDB } from './lib/db.js';



const app = express();
const PORT = process.env.PORT;
app.use(express.json())  //to get the data in json format from the request body
app.use('/api/auth', authRoutes);

app.get("/",(req,res) =>{
    res.send("Hello world! from backend")
})

app.listen(PORT,() =>{
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})