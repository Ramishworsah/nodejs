// user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true

    },
    name: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("user", userSchema);