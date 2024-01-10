const routes = require('express').Router();
const clientController = require('../controllers/clients');

//module.exports = {
//     getClientByID,
//     getClientByEmail,
//     deleteClient,
//     postNewClient,
//     updateClient
// }

//get client by id
routes.get('/client/:id', clientController.getClientByID);

//get client by email
routes.get('/clientemail/:email', clientController.getClientByEmail);

//delete client by id
routes.delete('/client/:id', clientController.deleteClient);

//add new client
routes.post('/client/', clientController.postNewClient);

//update existing client
routes.patch('/client/:id', clientController.updateClient);

module.exports = routes;