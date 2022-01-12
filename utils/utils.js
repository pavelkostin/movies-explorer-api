const allowedCors = {
  origin: [
    /* 'http://api.movie-kpa.nomoredomains.rocks/', */
    'http://localhost:3000',
    'https://web.postman.co',
  ],
  credentials: true,
};

module.exports = {
  allowedCors,
};
