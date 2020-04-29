const server = require('./app');
const appPort = process.env.PORT || 5000

const app = server.listen(appPort, () => {
    console.log(`[app] Server running in ${process.env.NODE_ENV} mode on port ${appPort}`.yellow.underline.bold)
})

module.exports = app;