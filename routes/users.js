const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/users', (req, res) => {
  const filePath = path.normalize('./data/users.json'); // ??  path from app.js  ??

  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      return;
    }
    res.send(data);
  });
});

router.get('/users/:id', (req, res) => {
  const filePath = path.normalize('./data/users.json');
  const { id } = req.params;

  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      return;
    }
    const newData = JSON.parse(data);

    const userMatch = newData.find(user => id === user._id);

    if (userMatch === undefined || userMatch.length === 0) {
      res.send({ message: 'User ID not found' });
      return;
    }

    res.send(userMatch);
  });
});

module.exports = router;
