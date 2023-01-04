const express = require('express');
const bodyParser = require('body-parser');
const {getProfile} = require('./middlewares/getProfile')
const app = express();

const routes = require('./routes');
app.use(bodyParser.json());

/**
 * FIX ME!
 * @returns contract by id
 */


app.use('/', routes);



// app.get('/contracts/:id',getProfile ,async (req, res) =>{
    
//     const {id} = req.params
//     const contract = await models.Contract.findOne({where: {id}})
//     if(!contract) return res.status(404).end()
//     res.json(contract)
// })
module.exports = app;
