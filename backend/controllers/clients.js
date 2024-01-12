const { response } = require('express');
const mongodb = require('../db/connect');
const objectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = 'aasdfadjqwrptowriqh498q398jgq3h49thq43hjfrwfaskdfj';
const reactApp = 'http://localhost:5173';

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
        //res.status(400).json("Error in get client by email");
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
    
    try {
        const email = req.body.email;
        const echeck = await mongodb
            .getDb()
            .db()
            .collection('clients')
            .findOne({email: email});

       
        if(!echeck){

        
            const saltRounds = 10;
            const pass = req.body.password;

            const hashpass = await bcrypt
                .genSalt(saltRounds)
                .then(salt => {
                    return bcrypt.hash(pass, salt);
                })
                .catch(e => console.error(e.message));
                
            const newClient = {
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                zip: req.body.zip,
                password: hashpass,
                selling: []
            };
            const result = await mongodb
                .getDb()
                .db()
                .collection('clients')
                .insertOne(newClient);
            if (result.acknowledged) {
                res.status(201).json(result);
            } else {
                res.status(500).json(result.error || 'Error occured while creating new client.');
            }
        }  else {
            res.status(422).json( res.error || 'Email is already registered.');
        } 
    } catch (e) {
        //console.log(e);
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

const loginEmailandPassword = async (req, res) => {
    const {email, password} = req.body;
    const result = await mongodb
        .getDb()
        .db()
        .collection('clients')
        .findOne({email: email});
    if(result){
        //res.json('found');
        const passOk = await bcrypt.compareSync(password, result.password);
        if (passOk){
            jwt.sign({id: result._id, 
                email: result.email}, jwtSecret, {}, (err, token) => {
                    if(err) {throw err;}
                    const key = 'password';
                    delete result[key]
                    const filteredData = result;
                    res.setHeader('Access-Control-Allow-Origin', reactApp)
                        .cookie('token', token)
                        .json(filteredData);

                        //, info was in jwt
                // fname: result.fname, 
                // zip: result.zip, 
                // selling: result.selling
            } );
            
            //res.status(201).json('password ok');
        } else{
            res.status(422).json('Password did not match.');
        }
    } else {
        res.status(422).json('User not found.');
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
    updateClient,
    loginEmailandPassword
}