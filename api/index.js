import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));


app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);



// **Error handling middleware**
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode: statusCode,
    });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
