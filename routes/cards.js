const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/cards', (req, res) => {
  try {
    const filePath = path.normalize('./data/cards.json');

    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return;
      }

      res.send(data);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
