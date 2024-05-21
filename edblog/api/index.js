 import express from 'express';
 import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
mongoose.connect (
    process.env.MONGO
).then(
    () =>{console.log('Veritabanı bağlantısı sağlandı!');
            }).catch(err=>{
                console.log(err);
            })

 const app = express();
 
 
 


 app.listen(3001, () =>{
    console.log('Sunucu 3001 portunda çalışıyor! ');
 });
