const routes = require('express').Router();

routes.use('/', require('./clients'));
routes.use('/', require('./inventory'));
// routes.use('/', require('./test'));

module.exports = routes;