import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js'
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
     console.log("Connected to MongoDB")
}).catch((err)=> {
    console.log(err);
})


const app = express();

app.use(express.json())

app.listen(3000, ()=> {
    console.log("server listening on port 3000")
});

app.use('/api/user',userRoutes)
app.use('/api/auth', authRoutes)