const morgan    = require('morgan');
const chalk     = require('chalk');

const morganLogging = morgan(function (tokens, req, res) {
    return chalk.blue.underline.bold([
        '[request]',
        tokens.method(req, res),
        tokens.status(req, res),
        tokens.url(req, res),
        tokens['response-time'](req, res) + ' ms',
    ].join(' '));
});

module.exports = morganLogging