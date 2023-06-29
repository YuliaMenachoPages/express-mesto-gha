const handleError = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Ошибка сервера' });
  }
  next();
};

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
    this.message = message || 'Ошибка авторизации';
  }
}

class ForbiddenAccessError extends Error {
  constructor(message) {
    super(message || 'Нет доступа.');
    this.statusCode = 403;
  }
}

class NotFoundDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = {
  handleError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenAccessError,
  NotFoundDataError,
};

