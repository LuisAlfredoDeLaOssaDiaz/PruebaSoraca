const express = require('express');
const UserController = require('../controllers/user');
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.get('/user', [md_auth.asureAuth], UserController.getUsers);
api.get('/user/:_id', [md_auth.asureAuth], UserController.getUser);
api.post('/user', [md_auth.asureAuth], UserController.createUser);
api.patch(
    '/user/:_id',
    [md_auth.asureAuth],
    UserController.updateUser
);
api.delete(
    '/user/:_id',
    [md_auth.asureAuth],
    UserController.deleteUser
);

module.exports = api;
