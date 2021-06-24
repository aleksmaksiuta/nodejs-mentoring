const config = require('./config');
const app = require('./app');
const errorHandler = require('./utils/ErrorHandler');
const getColor = (str) => `\x1b[36m${str}\x1b[0m`;

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
