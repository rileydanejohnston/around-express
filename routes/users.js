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

module.exports = router;