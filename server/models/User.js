//authorization model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        default: 'customer',
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;