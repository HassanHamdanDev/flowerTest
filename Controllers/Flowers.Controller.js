'use strict';

const axios = require('axios');
const { usersModel, flowersModel } = require('../Models/Flower.model');



const setFlowersData = async () => {
    let url = `https://flowers-api-13.herokuapp.com/getFlowers`;
    let flowersData = await axios.get(url);
    let cleanData = flowersData.data.flowerslist.map(elem => {
        return new flowersModel({
            name: elem.name,
            photo: elem.photo,
            instructions: elem.instructions,
        })
    });
    cleanData.map(elem => elem.save());
}

const getFlwoersData = async (req, res) => {
    let flowersData = await flowersModel.find({});
    res.status(200).json(flowersData)
}

const createUser = async (req, res) => {
    let email = req.params.email;
    let checkUser = await usersModel.exists({ email });
    if (checkUser) {
        res.status(200).send('user exists');
    } else {
        let newUser = new usersModel({
            email: email,
        });
        newUser.save();
        res.status(201).json(`user Created`);
    }
}

const getUser = async (req, res) => {
    let email = req.params.email;
    let user = await usersModel.findOne({ email: email });
    res.status(200).json(user);
}

const addToFav = async (req, res) => {
    let email = req.params.email;
    let flowerId = req.params.flowerId;
    let user = await usersModel.findOne({ email: email });
    let flower = await flowersModel.findOne({ _id: flowerId });
    user.favFlowers.push(flower);
    user.save();
    res.status(200).json(user);
}

const deleteFav = async (req, res) => {
    let email = req.params.email;
    let flowerId = req.params.flowerId;
    let user = await usersModel.findOne({ email: email });
    user.favFlowers.map((elem, index) => {
        if (elem._id.toString() === flowerId.toString()) {
            user.favFlowers.splice(index, 1);
        }
    });
    user.save();
    res.status(200).json(user);
}

const updateFav = async (req, res) => {
    let email = req.params.email;
    let flowerId = req.params.flowerId;
    let update = req.body;
    let user = await usersModel.findOne({ email: email });
    user.favFlowers.map(elem => {
        if (elem._id.toString() === flowerId.toString()) {
            elem.name = update.name;
            elem.photo = update.photo;
            elem.instructions = update.instructions;
        }
    });
    user.save();
    let updateUser = await usersModel.findOneAndUpdate({ email: email }, user);
    res.status(200).json(updateUser);
}

module.exports = {
    setFlowersData,
    getFlwoersData,
    createUser,
    getUser,
    addToFav,
    deleteFav,
    updateFav,
}