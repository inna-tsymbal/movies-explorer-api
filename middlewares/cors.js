const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const allowedCors = [
  'https://diplom.innatsymbal.nomoredomainsmonster.ru',
  'http://diplom.innatsymbal.nomoredomainsmonster.ru',
  'https://api.diplom.innatsymbal.nomoredomainsmonster.ru',
  'http://api.diplom.innatsymbal.nomoredomainsmonster.ru',
  'https://localhost:3000',
  'http://localhost:3000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;

  const { method } = req;

  const requestHeaders = req.headers['access-control-request-headers'];

  res.header('Access-Control-Allow-Credentials', true);

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};