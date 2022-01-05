const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/diplom', {
  useNewUrlParser: true,
  /* useCreateIndex: true, */
  /* useFindAndModify: false */
});

// подключаем мидлвары, роуты и всё остальное...
app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})