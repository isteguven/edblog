import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

 //test api (interaction with backend test)
export const test = (req,res) =>{
    res.json({message:'API çalışıyor'});
}

export const updateUser = async (req, res, next) => {
      if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Bu üye bilgilerini güncelleme yetkiniz yok!'));
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, 'Şifre en az altı karakterden oluşmalı!'));
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Üye adı en az yedi, en fazla 20 karakter uzunluğunda olabilir!')
      );
    }    
    if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Üye adı, boşluk içeremez!'));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Üye adı, küçük karakterlerden oluşmalı!'));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, 'Üye adı, yalnızca harf ve rakamlardan oluşmalı!')
        );
      }
    }
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.userId,
          {
            $set: {
              username: req.body.username,
              email: req.body.email,
              profilePicture: req.body.profilePicture,
              password: req.body.password,
            },
          },
          { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
      } catch (error) {
        next(error);
      }    
    };

    export const deleteUser = async(req,res,next)=>{
        if(!req.user.isAdmin && req.user.id !== req.params.userId){
          return next(errorHandler(403,'Bu üye hesabını silme yetkiniz yok!'))
        }
        try {
          await User.findByIdAndDelete(req.params.userId);
          res.status(200).json('Üye hesabı silindi!');
        } catch (error) {
          next(error);
        }
      };

      export const signout = (req, res, next) => {
        try {
          res
            .clearCookie('access_token')
            .status(200)
            .json('Üye çıkış yaptı!');
        } catch (error) {
          next(error);
        }
      };

      export const getUsers = async (req, res, next) => {
        if (!req.user.isAdmin) {
          return next(errorHandler(403, 'You are not allowed to see all users'));
        }
        try {
          const startIndex = parseInt(req.query.startIndex) || 0;
          const limit = parseInt(req.query.limit) || 9;
          const sortDirection = req.query.sort === 'asc' ? 1 : -1;
      
          const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);
      
          const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
          });
      
          const totalUsers = await User.countDocuments();
      
          const now = new Date();
      
          const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
          );
          const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
          });
      
          res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers,
          });
        } catch (error) {
          next(error);
        }
      };

      export const getUser = async (req, res, next) => {
        try {
          const user = await User.findById(req.params.userId);
          if (!user) {
            return next(errorHandler(404, 'Üye bulunamadı!'));
          }
          const { password, ...rest } = user._doc;
          res.status(200).json(rest);
        } catch (error) {
          next(error);
        }
      };