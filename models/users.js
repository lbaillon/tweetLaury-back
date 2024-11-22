const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : String,
    firstname: String,
    password: String,
    avatar: String,
    token: String
})

const User = mongoose.model("users", userSchema)

module.exports = User