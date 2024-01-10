const routes = require('express').Router();
const testController = require('../controllers/test');

routes.get('/test', testController.testFunc);

routes.post('/test', testController.testPost);

module.exports= routes;