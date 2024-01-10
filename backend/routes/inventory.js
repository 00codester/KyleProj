const routes = require('express').Router();
const inventoryController = require('../controllers/inventory');

// module.exports = {
//     getInventory,
//     getInventoryById,
//     deleteInventory,
//     postNewInventory,
//     putInventoryItem
// }

// get all inventory
routes.get('/inventory', inventoryController.getInventory);

//get inventory by id
routes.get('/inventory/:id', inventoryController.getInventoryById);

//get inventory by category
routes.get('/inventorycat/:category', inventoryController.getAllInventoryByCategory);

//get inventory by category
routes.get('/inventorycatns/:category', inventoryController.getInventoryByCategoryNotSold);

//delete inventory by id
routes.delete('/inventory/:id', inventoryController.deleteInventory);

//add new inventory
routes.put('/inventory/', inventoryController.postNewInventory);

//update existing inventory
routes.patch('/inventory/:id', inventoryController.putInventoryItem);

module.exports = routes;