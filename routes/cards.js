const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/cards', (req, res) => {
  const filePath = path.normalize('./data/cards.json');

  fs.readFile(filePath, { encoding : 'utf-8'}, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    res.send(data);
  });
});

module.exports = router;