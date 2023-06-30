const { celebrate, Joi } = require('celebrate');

const linkRegEx = /https?:\/\/(www\.)*[\w\S]+\.[\w\S]{2,}/;

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(linkRegEx),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(linkRegEx),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(linkRegEx),
  }),
});

const idValidation = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  userValidation,
  loginValidation,
  userInfoValidation,
  userAvatarValidation,
  cardValidation,
  idValidation,
};
