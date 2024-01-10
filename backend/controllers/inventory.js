const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;

// Get all inventory
const getInventory = async (req, res) => {
    console.log("In get all Inventory");
    try {
        const result = await mongodb
            .getDb()
            .db()
            .collection("inventory")
            .find();
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        });
    } catch (e) {
        //console.log(e);
        res.status(400).json({ message: e.message });
    }
};

//get inventory item by category
const getAllInventoryByCategory = async (req, res) => {
    console.log("In get inventory by Category");
    try {
      //const inventoryId = new objectId(req.params.id);
      let query = { category: req.params.category }
      const result = await mongodb
        .getDb()
        .db()
        .collection('inventory')
        .find(query);
      result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
      });
    } catch (e) {
      //console.error(e);
      res.status(400).json({ message: e.message });
    }
};

//get inventory item by category not sold, works just may use logic in frontend instead of server
const getInventoryByCategoryNotSold = async (req, res) => {
    console.log("In get inventory by Category");
    try {
      //const inventoryId = new objectId(req.params.id);
      let query = { category: req.params.category, sold: req.params.sold == false }
      const result = await mongodb
        .getDb()
        .db()
        .collection('inventory')
        .find(query);
      result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
      });
    } catch (e) {
      //console.error(e);
      res.status(400).json({ message: e.message });
    }
};


//get inventory item by id
const getInventoryById = async (req, res, next) => {
    console.log("In get inventory by ID");
    try {
      const inventoryId = new objectId(req.params.id);
      const result = await mongodb
        .getDb()
        .db()
        .collection('inventory')
        .find({_id: inventoryId});
      result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
      });
    } catch (e) {
      //console.error(e);
      res.status(400).json({ message: e.message });
    }
};

  // Delete a inventory item
const deleteInventory = async (req, res) => {
    const inventoryId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('inventory')
      .deleteOne({ _id: inventoryId });
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send(response);
    } else {
      res
        .status(500)
        .json(response.error || "Some error occurred while deleting the recipe.");
    }
  };

// //add inventory item
// const postNewInventory = async (req, res) => {
//     const postData = req.body;
//     try {
//       const result = await mongodb
//         .getDb()
//         .db()
//         .collection('inventory')
//         .insertOne(postData);
//       res.setHeader("Content-Type", "application/json").status(201).json(result);
//     } catch (e) {
//       console.log(e);
//       res
//         .status(400)
//         .json(
//           "Inventory Post Request: Invalid request data found in request body."
//         );
//     }
// };

//add new inventory item
const postNewInventory = async(req, res) => {
    try {
        const newItem = {
            name: req.body.itemName,
            price: req.body.price,
            location: req.body.location,
            description: req.body.description,
            sold: req.body.sold,
            category: req.body.category
        };
        //const newClient = new userSchema(req.body);
        const result = await mongodb.getDb().db().collection('inventory').insertOne(newItem);
        if(result.acknowledged){
            res.status(201).json(result);
        } else {
            res.status(500).json(response.error || 'Error occured while creating client');
        }
    } catch(err){
        res.status(500).json({ err });
    }
};

//update inventory item
const putInventoryItem = async (req, res) => {
    const newData = req.body;
    const id = req.params.id;
    try {
      const result = await mongodb
        .getDb()
        .db()
        .collection('inventory')
        .findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: newData },
          { returnOriginal: false }
        );
      if (result == null) {
        res
          .status(404)
          .json({ error: `Inventory Put Request: No item found with id of ${id}` });
        return;
      }
      res.setHeader("Content-Type", "application/json").status(200).json(result);
    } catch (e) {
      console.log(e);
      res
        .status(400)
        .json("Inventory Put Request: Invalid request data found in request body.");
    }
};

module.exports = {
    getInventory,
    getInventoryById,
    getAllInventoryByCategory,
    getInventoryByCategoryNotSold,
    deleteInventory,
    postNewInventory,
    putInventoryItem
}