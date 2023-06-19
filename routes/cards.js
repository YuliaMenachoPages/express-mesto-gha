const router = require('express').Router();

const {getCards, createCard, deleteCardById, likeCard, dislikeCard} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', deleteCardById);
router.delete('/:cardId/likes', deleteCardById);

module.exports = router;

