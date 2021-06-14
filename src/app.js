const express = require('express');
const cors = require('cors');
const users = require('./controllers/users');
const groups = require('./controllers/groups');
const authorization = require('./controllers/authorization');
const config = require('./config');
const errorHandler = require('./utils/ErrorHandler');

const logger = require('./middleware/logger');
const errorResolver = require('./middleware/errorResolver');
const auth = require('./middleware/auth');

const getColor = (str) => `\x1b[36m${str}\x1b[0m`;

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.use('/login', authorization);
app.use('/users', auth, users);
app.use('/groups', auth, groups);

app.use(errorResolver);

app.listen(config.port, () => {
  console.log(`App is on port ${getColor(config.port)}`);
});

process.on('unhandledRejection', (reason) => {
  throw reason;
});

process.on('uncaughtException', (error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});
