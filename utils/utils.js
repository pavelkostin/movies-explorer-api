const allowedCors = {
  origin: [
    'http://kpa-movie-explorer-front.nomoredomains.work/',
    'https://api.movie-kpa.nomoredomains.rocks/',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'https://web.postman.co',
  ],
  credentials: true,
};

module.exports = {
  allowedCors,
};
