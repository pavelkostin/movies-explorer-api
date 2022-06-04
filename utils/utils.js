const allowedCors = {
  origin: [
    'http://kpa-movie-explorer-front.nomoredomains.work',
    'https://kpa-movie-explorer-front.nomoredomains.work',
    /* 'https://api.movie-kpa.nomoredomains.rocks/', */
    'https://localhost:3000',
    'http://localhost:3000',
    'https://localhost:3001',
    'http://localhost:3001',
    'https://localhost:3002',
    'http://localhost:3002',
    'https://localhost:3003',
    'http://localhost:3003',
    'https://web.postman.co',
    'http://web.postman.co',
  ],
  credentials: true,
};

module.exports = {
  allowedCors,
};
