const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { createUser } = require('./controllers/users');
const { loginUser } = require('./controllers/users');

const port = 3000;

// подключаем монго
mongoose.connect('mongodb://localhost:27017/diplom', {
  useNewUrlParser: true,
});

const app = express();

// подключаем парсер данных
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// подключаем роуты
app.use((req, res, next) => {
  req.user = {
    _id: '61d6f3477a053620ab3da217' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/signup', createUser);
app.use('/signin', loginUser);
app.use(routes);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})