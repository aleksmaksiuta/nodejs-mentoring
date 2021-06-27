const express = require('express');
const cors = require('cors');
const users = require('./controllers/users');
const groups = require('./controllers/groups');
const authorization = require('./controllers/authorization');

const logger = require('./middleware/logger');
const errorResolver = require('./middleware/errorResolver');
const auth = require('./middleware/auth');

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

module.exports = app;
