const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/users', (req, res) => {
  const filePath = path.normalize('./data/users.json'); // ??  path from app.js  ??

  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err){
      console.log(err);
      return;
    }
    console.log(data);
    res.send(data);
  });
});

router.get('/users/:id', (req, res) => {
  const filePath = path.normalize('./data/users.json');
  const { id } = req.params;

  fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const newData = JSON.parse(data);

    const userMatch = newData.filter((user) => {
      if (id === user._id) {
        return user;
      }
    });

    if (userMatch === undefined || userMatch.length === 0) {
      res.send({ "message": "User ID not found" });
      return;
    }

    res.send(userMatch);
  })
});

module.exports = router;