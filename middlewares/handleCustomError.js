const mongoose = require('mongoose');
const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ConflictError } = require('../errors/ConflictError');

function handleCustomError(err, res, next) {
  if (err instanceof mongoose.Error.ValidationError) {
    next(new BadRequestError('Неправильно заполнены поля'));
  }

  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    next(new NotFoundError('Запрашиваемые данные не найдены'));
  }

  if (err instanceof mongoose.Error.CastError) {
    next(new BadRequestError('Передан некорректный id'));
  }

  if (err.code === 11000) {
    next(new ConflictError('Пользователь с такими данными уже существует.'));
  }

  next(err);
}

module.exports = {
  handleCustomError,
};
