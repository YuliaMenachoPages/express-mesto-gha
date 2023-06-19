const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({data: users}))
    .catch(() => res.status(500).send({message: 'Ошибка сервера'}));
};

module.exports.getUserById = (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then(user => {
      if (!user) {
        res.status(404).send({message: `Пользователь по указанному id: ${userId} не найден.`});
      }
      res.send({data: user})
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({message: 'Переданы некорректные данные пользователя.'});
      }
      res.status(500).send({message: 'Ошибка по умолчанию'})
    });
};

module.exports.createUser = (req, res) => {
  const {name, about, avatar} = req.body;
  const userId = req.params.userId;
  User.create({name, about, avatar})
    .then(user => {
      if (!user) {
        res.status(404).send({message: `Пользователь по указанному id: ${userId} не найден.`});
      }
      res.send({data: user})
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({message: 'Переданы некорректные данные при обновлении аватара.'});
      }
      res.status(500).send({message: 'Ошибка по умолчанию'})
    });
};

module.exports.updateUserInfo = (req, res) => {
  const {name, about} = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, {name, about}, {new: true, runValidators: true})
    .then(user => {
      if (!user) {
        res.status(404).send({message: `Пользователь по указанному id: ${userId} не найден.`});
      }
      res.send({data: user})
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({message: 'Переданы некорректные данныепри обновлении профиля.'});
      }
      res.status(500).send({message: 'Ошибка по умолчанию'})
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const {avatar} = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, {avatar}, {new: true, runValidators: true})
    .then(user => {
      if (!user) {
        res.status(404).send({message: `Пользователь по указанному id: ${userId} не найден.`});
      }
      res.send({data: user})
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({message: 'Переданы некорректные данные при обновлении аватара.'});
      }
      res.status(500).send({message: 'Ошибка по умолчанию'})
    });
};
