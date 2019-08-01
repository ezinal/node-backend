const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    surname: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: false,
    },
    phone: {
        type: Number,
        required: false
    },
    city: {
        type: String,
        required: false,
        minlength: 1,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }],
    accountActive: {
        type: Number,
        default: 1
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['id', 'name', 'surname', 'gender', 'age', 'phone', 'city', 'email', 'password']);
}

UserSchema.methods.generateAuthToken = function() {
    var user = User;
    var access = 'auth';
    var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

    user.tokens = user.tokens.concat([{ access, token }]);

    return user.save().then(() => {
        return token;
    });
};

let User = mongoose.model('User', UserSchema);

module.exports = { User };