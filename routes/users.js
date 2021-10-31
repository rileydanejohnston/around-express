const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/users', (req, res) => {
  try {
    const filePath = path.normalize('./data/users.json'); // ??  path from app.js  ??

    fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
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

router.get('/users/:id', (req, res) => {
  try {
    const filePath = path.normalize('./data/users.json');
    const { id } = req.params;

    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        res.status(500).send({ message: 'An error has occurred on the server' });
        return;
      }
      const newData = JSON.parse(data);

      const userMatch = newData.find((user) => id === user._id);

      if (userMatch === undefined || userMatch.length === 0) {
        res.status(404).send({ message: 'User ID not found' });
        return;
      }

      res.send(userMatch);
    });
  } catch (err) {
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
});

module.exports = router;
