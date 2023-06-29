const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {BadRequestError, UnauthorizedError, ForbiddenAccessError, NotFoundDataError  } = require('../middlewares/handleErrors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {

      res.send({ data: user });
    })
    .catch((err) => {
      next(new NotFoundDataError(`Пользователь по указанному id: ${userId} не найден.`));
    });
  };

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) =>
    User.create({
    name: req.body.name,
    about: req.body.about,
    avatar: req.body.avatar,
    email: req.body.email,
    password: hash,
  })
)
    .then((user) => {
      res.status(201).send( {data: user} );
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next('Переданы некорректные данные пользователя.');
      } else if (error.code === 11000)
      {
        res.status(404).send({message: 'Пользователь с таким email существует'});
     return
      }
      next(err);
    })
};

module.exports.getUserInfo = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'NotValidId') {
        res.status(404).send({message: `Пользователь по указанному id: ${userId} не найден.`});
        return;
      }
          next(err);
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: `Пользователь по указанному id: ${userId} не найден.` });
        return;
      } if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данныепри обновлении профиля.' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'NotValidId') {
        res.status(404).send({ message: `Пользователь по указанному id: ${userId} не найден.` });
      } else if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
        return;
      }
      res.status(500).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, 'magic-key', { expiresIn: '7d' }),
      });
    })
    .catch(next);
}