import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

 //test api (interaction with backend test)
export const test = (req,res) =>{
    res.json({message:'API çalışıyor'});
}

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'Bu kullanıcı bilgilerini güncelleme yetkiniz yok!'));
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
        errorHandler(400, 'Kullanıcı adı en az yedi, en fazla 20 karakter uzunluğunda olabilir!')
      );
    }    
    if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Kullanıcı adı, boşluk içeremez!'));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Kullanıcı adı, küçük karakterlerden oluşmalı!'));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, 'Kullanıcı adı, yalnızca harf ve rakamlardan oluşmalı!')
        );
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

}