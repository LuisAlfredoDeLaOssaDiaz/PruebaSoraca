const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {type: String},
    id: {type: String, unique: true},
    password: {type: String},
    active: {type: Boolean},
    createdDate: {type: Date},
});

module.exports = mongoose.model('User', UserSchema);
