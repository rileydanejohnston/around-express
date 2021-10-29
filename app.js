const express = require('express');
const userRouter = require('./routes/users.js');
const cardRouter = require('./routes/cards');
const { PORT = 3000 } = process.env;

const app = express();

app.use('/', userRouter);
app.use('/', cardRouter);


app.get('*', (req, res) => {
  res.status(404).send({ "message": "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
})