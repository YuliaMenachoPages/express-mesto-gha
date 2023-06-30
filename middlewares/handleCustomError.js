const mongoose = require('mongoose');
const { BadRequestError } = require('../errors/BadRequestError');
const { ForbiddenAccessError } = require('../errors/ForbiddenAccessError');
const { NotFoundDataError } = require('../errors/NotFoundDataError');
const { UnauthorizedError } = require('../errors/UnauthorizedError');
const { DuplicateKey } = require('../errors/DuplicateKey');

const handleCustomError = (err, res, next) => {
  if (err instanceof mongoose.Error.CastError) {
    next(new BadRequestError('Передан некорректный Id'));
  }
  if (err instanceof mongoose.Error.UnauthorizedError) {
    next(new UnauthorizedError('Пользователь не авторизован'));
  }
  if (err instanceof mongoose.Error.ForbiddenAccessError) {
    next(new ForbiddenAccessError('Действие запрещено'));
  }
  if (err instanceof mongoose.Error.CastError) {
    next(new NotFoundDataError('Указанный id не найден'));
  }
  if (err instanceof mongoose.Error.DuplicateKey) {
    next(new DuplicateKey('Пользователь с указанными данными уже существует'));
  }
  next(err);
};

module.exports = {
  handleCustomError,
};
