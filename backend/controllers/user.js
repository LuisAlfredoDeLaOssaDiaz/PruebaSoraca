const bcrypt = require('bcryptjs');
const User = require('../models/user');

function getUsers(req, res) {
    User.find().then((userStored) => {
        res.status(200).send({ msg: userStored });
    })
    .catch((err) => {
        res.status(400).send({ msg: `Error to get notes.: ${err}`});
    });
}

function getUser(req, res) {
    const { _id } = req.params;

    User.findOne({_id}).then((userStored) => {
        res.status(200).send({ msg: userStored });
    })
    .catch((err) => {
        res.status(400).send({ msg: `Error to get notes.: ${err}`});
    });
}

function createUser(req, res) {
    const { password } = req.body;
    const user = new User({ ...req.body, active: false})
    
    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);
    user.password = hasPassword;
    
    user.save().then((noteStored) => {
        res.status(201).send(noteStored);
    }).catch((error) => { 
        res.status(400).send({ msg: 'Error to create user.'});
    });
}

function updateUser(req, res) {
    const { _id } = req.params;
    const userData = req.body;

    if (userData.password) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userData.password, salt);
        userData.password = hashPassword;
    } else {
        delete userData.password;
    }
    
    User.findByIdAndUpdate({ _id }, userData).then((result) => {
        res.status(200).send({ msg : "Success : User updated."})
    }).catch((err) => {
        res.status(400).send({ msg : "Error to updated user."})
    });
}

function deleteUser(req, res) {
    const { _id } = req.params;

    User.findByIdAndDelete({_id}).then(() => {
        res.status(400).send({ msg: "Success: User deleted."});
    })
    .catch((err) => {
        res.status(400).send({ msg: "Error to delete note."});
    });
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}