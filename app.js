require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { allowedCors } = require('./utils/utils');
/* const randomString = require('./utils/randomString'); */
const rateLimit = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');

const port = 3000;

/* console.log(randomString); */

// подключаем монго
mongoose.connect('mongodb://localhost:27017/trainig', {
  useNewUrlParser: true,
});

const app = express();

// rate limiter
app.use(rateLimit);

// helmet
app.use(helmet());

// подключаем парсер данных
app.use(express.json());
app.use(cors(allowedCors));
app.use(express.urlencoded({ extended: true }));

// request Logger
app.use(requestLogger);

// подключаем роуты
app.use(routes);

// error Logger
app.use(errorLogger);

// обработка ошибок
app.use(errors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
