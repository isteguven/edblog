 import express from 'express';
 import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
mongoose.connect (
    process.env.MONGO
).then(
    () =>{console.log('Veritabanı bağlantısı sağlandı!');
            }).catch(err=>{
                console.log(err);
            })

 const app = express();

 app.use(express.json())
 app.use(cookieParser())

 app.listen(3001, () =>{
    console.log('Sunucu 3001 portunda çalışıyor! ');
 });


 app.use('/api/user', userRoutes);
 app.use('/api/auth', authRoutes);
 //middleware for error handling
 app.use((err,req,res,next)=>{
const statusCode = err.statusCode || 500;
const message = err.message || 'Sunucu hatası!';
res.status(statusCode).json({
    success:false,
    statusCode,
    message
 })
 })