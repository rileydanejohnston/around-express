const router = require('express').Router();
const { getCards, createCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCard);

/*
const fs = require('fs');
const path = require('path');

router.get('/cards', (req, res) => {
  try {
    const filePath = path.normalize('./data/cards.json');

    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'An error has occurred on the server' });
        return;
      }

      res.send(data);
    });
  } catch (err) {
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
});

*/

module.exports = router;
