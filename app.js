const express = require('express');
const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.status(404).send('Error');
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})