'use strict';

const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
const server = express();
server.use(cors());
server.use(express.json());
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const MONGO_ATLAS = process.env.MONGO_ATLAS;

const {
    setFlowersData,
    getFlwoersData,
    createUser,
    getUser,
    addToFav,
    deleteFav,
    updateFav,
} = require('./Controllers/Flowers.Controller');

mongoose.connect(`${MONGO_ATLAS}`, { useNewUrlParser: true, useUnifiedTopology: true });

server.get('/', (req, res) => { res.status(200).json({ massage: "Iam Working" }); });

server.get('/setData', setFlowersData);
server.get('/getFlowers', getFlwoersData);
server.post('/createUser/:email', createUser);
server.get('/getUser/:email', getUser);
server.put('/addToFav/:email/:flowerId', addToFav);
server.delete('/deleteFav/:email/:flowerId', deleteFav);
server.put('/updateFav/:email/:flowerId', updateFav);


server.listen(PORT, console.log(`listening to ${PORT}`));