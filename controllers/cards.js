const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(films => res.send({data: films}))
    .catch(() => res.status(500).send({message: 'Ошибка по умолчанию'}));
};


module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const {name, link} = req.body;

  Card.create({name, link, owner})
    .then(card => res.send({data: card}))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({message: Object.values(err.errors).map((error) => error.message).join(',')})
      }
        res.status(500).send({message: 'Ошибка по умолчанию'})
      });
    };

module.exports.deleteCardById = (req, res) => {
  Card.deleteOne(req.params)
    .then(card => {
      if (!card) {
        res.status(404).send({message: `Карточка с указанным _id не найдена.`});
      }
      res.send({data: card})
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({message: 'Переданы некорректные данные при создании карточки.'});
      }
      res.status(500).send({message: 'Ошибка по умолчанию'})
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params,
    {$addToSet: {likes: req.user._id}},
    {new: true},
  )
    .then(card => {
      if (!card) {
        res.status(404).send({message: `Передан несуществующий _id карточки.`});
      }
      res.send({data: card})
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({message: 'Переданы некорректные данные для постановки лайка.'});
      }
      res.status(500).send({message: 'Ошибка по умолчанию'})
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params,
    {$pull: {likes: req.user._id}},
    {new: true},
  )
    .then(card => {
      if (!card) {
        res.status(404).send({message: `Передан несуществующий _id карточки.`});
      }
      res.send({data: card})
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({message: 'Переданы некорректные данные для снятия лайка. '});
      }
      res.status(500).send({message: 'Ошибка по умолчанию'})
    });
};