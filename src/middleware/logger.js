const winston = require('winston');
const expressWinston = require('express-winston');

const codes = ['400', '404', '401', '403'];

const getErrorMessage = (res) => {
  const hasError = codes.findIndex(code => res.statusCode.indexOf(code) !== -1) !== -1;

  if (!hasError) {
    return '';
  }

  return `ERROR: ${res.statusMessage};`;
};

const getBody = (req) => {
  if (!Object.keys(req.body).length) {
    return ''
  }
  return `BODY: ${JSON.stringify(req.body)}`
};

module.exports = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
  meta: false,
  msg: (req, res) => {
    return `METHOD: ${req.method}; URL: ${req.url}; ${getBody(req)} ${getErrorMessage(res)}`;
  },
  colorize: true,
});
