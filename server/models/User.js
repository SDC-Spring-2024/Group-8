const mongoose = require('mongoose');

/**
* @type {mongoose.SchemaDefinitionProperty}
*/
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true/*, validate: (value) => value.length >=8*/ },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    profile: {
        firstName: String,
        lastName: String
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
