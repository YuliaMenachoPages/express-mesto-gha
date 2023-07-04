const Card = require('../models/card');
const { handleCustomError } = require('../middlewares/handleCustomError');
const { ForbiddenAccessError } = require('../errors/ForbiddenAccessError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((films) => res.send({ data: films }))
    .catch((err) => handleCustomError(err, res, next));
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => handleCustomError(err, res, next));
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenAccessError('Недостаточно прав для удаления карточки.');
      }
      Card.findByIdAndRemove(req.params.cardId)
        .then((deletedCard) => res.send(deletedCard))
        .catch((err) => handleCustomError(err, res, next));
    })
    .catch((err) => handleCustomError(err, res, next));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => handleCustomError(err, res, next));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => handleCustomError(err, res, next));
};
