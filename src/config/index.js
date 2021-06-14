require('dotenv').config();

module.exports = {
  secret: process.env.JWTSECRET,
  port: process.env.PORT || 4000,
  dbConnectionUrl: process.env.DB,
  pool: {
    max: 15,
    min: 0,
    idle: 10000,
    acquire: 1000,
  },
};
