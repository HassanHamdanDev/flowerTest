'use strict';

const mongoose = require('mongoose');

const flowerSchema = new mongoose.Schema({
    name: String,
    photo: String,
    instructions: String,
});

const userSchema = new mongoose.Schema({
    email: String,
    favFlowers: Array
});

const flowersModel = mongoose.model('flower', flowerSchema);
const usersModel = mongoose.model('user', userSchema);

module.exports = {
    flowersModel,
    usersModel,
}