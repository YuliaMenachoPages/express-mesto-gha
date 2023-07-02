const router = require('express').Router();
const { cardValidation, idValidation} = require('../middlewares/validationJoi');

const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', cardValidation, createCard);
router.delete('/:cardId', idValidation, deleteCardById);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
