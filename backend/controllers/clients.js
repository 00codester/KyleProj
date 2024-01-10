const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;

const getClientByID = async (req, res, next) => {
    console.log("In get client by ID");
    try {
        // if (!req.params["_id"]) {
        //     console.error("Lack of _id error in get client by id");
        // }
        // let query = { _id: new ObjectId(req.params["_id"]) };
        // console.log(query);
        const clientId = new objectId(req.params.id);
        const result = await mongodb
            .getDb()
            .db()
            .collection('clients')
            .find({_id: clientId});
        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        });
    } catch (e) {
        console.error(e);
        res.status(400).json("Error in Get client by ID");
    }
};

const getClientByEmail = async (req, res) => {
    console.log('In get client by email');

    try{
        let query = { email: req.params.email }

        const result = await mongodb
            .getDb()
            .db()
            .collection('clients')
            .find(query);

        result.toArray().then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        });
    } catch (e) {
        console.log(e);
        res.status(400).json("Error in get client by email");
    }
};

const deleteClient = async (req, res) => {
    const clientId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDb()
        .db()
        .collection('clients')
        .deleteOne({ _id: clientId });
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(200).send(response);
    } else {
        res
            .status(500)
            .json(response.error || "Some error occurred while deleting the client.");
    }
};

//add new client
const postNewClient = async (req, res) => {
    //const postData = req.body;
    try {
        const newClient = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            zip: req.body.zip,
            password: req.body.password,
            selling: []
        };
        const result = await mongodb
            .getDb()
            .db()
            .collection('clients')
            .insertOne(newClient);
        //res.setHeader("Content-Type", "application/json").status(201).json(result);
        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res.status(500).json(response.error || 'Error occured while creating new client');
        }
    } catch (e) {
        console.log(e);
        res
            .status(400)
            .json(
                "Client Post Request: Invalid request data found in request body."
            );
    }
};

// const updateClient = async (req, res) => {
//     const newData = req.body;
//     const id = req.params.id;
//     try {
//         const result = await mongodb
//             .getDb()
//             .db()
//             .collection('clients')
//             .findOneAndUpdate(
//               {_id: new ObjectId(id)},
//               { $set: newData },
//               {returnDocument: 'after'}
//             );
//         if(result == null){
//             res.status(404).json({ error: `Client Put Request: No item found with id of ${id}` })
//             return
//         }
//         res.setHeader('Content-Type', 'application/json').status(200).json(result);
//     } catch (e) {
//         console.log(e);
//         res.status(400).json("Client Put Request: Invalid request data found in request body.");
//     }
// };  

const updateClient = async(req, res) =>{
    try {
        const clientId = new ObjectId(req.params.id);
        
        const client = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        };
        const result = await mongodb
            .getDb()
            .db()
            .collection('clients')
            .replaceOne({_id: clientId}, client);
        console.log(result);
        if(result.modifiedCount > 0){
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Error occured while creating client');
        }
    } catch(err){
        res.status(500).json({ err });
    }
};

// const addInvtoClient = async(req, res) => {
//     try {
//         const clientId = new ObjectId(req.params.id);

//         const result = await mongodb
//             .getDb()
//             .db()
//             .collection('clients')
//             .
//     } catch(err) {
//         res.status(500).json({err});
//     }
// };

module.exports = {
    getClientByID,
    getClientByEmail,
    deleteClient,
    postNewClient,
    updateClient
}