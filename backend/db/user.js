const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const user_model = mongoose.model('users', userSchema);

module.exports = user_model;