const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const mongodb = require('./db/connect');
const routes = require('./routes');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3000;

app
    .use(cors({
        credentials: true,
        origin: 'http://localhost:5174'
    }))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', routes)
    .post('/test', (req, res) => {
        const {email, fname, lname, zip, password, is18} = req.body;
        res.json({email, fname, lname, zip});
    });

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
