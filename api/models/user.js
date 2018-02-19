var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Create user schema
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    admin: Boolean,
    hash: String,
    salt: String
}, {timestamps: true});

//Check validation on fields
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = mongoose.model('User', UserSchema);
