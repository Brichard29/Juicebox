const PORT = 3000;
const express = require('express');
const server = express();
require('dotenv').config();


const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json())

const apiRouter = require('./api');
server.use('/api', apiRouter);

server.use((req, res, next) => {
    console.log("<____Body logger START____>");
    console.log(req.body);
    console.log("<____Body logger END____>");

    next();
});

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log('The server is up on port', PORT)
});