const mongodb = require('../db/connect');

const testFunc = async (req, res) => {
    res.send('test');
};

const testPost = async (req, res) => {
    const{email, fname, lname, zip, password, is18} = req.body;
    res.json({email, fname, lname, zip, password, is18});
}

module.exports= {
    testFunc,
    testPost
};