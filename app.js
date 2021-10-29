const express = require('express');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards');
const { PORT = 3000 } = process.env;

const app = express();

app.use('/', userRouter);
app.use('/', cardRouter);


app.get('/', (req, res) => {
  res.status(404).send('Error');
});

app.get('/cards', (req, res) => {
  res.status(404).send('Here is the cards section');
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})