const handleError = (err, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Ошибка сервера' });
  }
  next();
};

module.exports = {
  handleError,
};
