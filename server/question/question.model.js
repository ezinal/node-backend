const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        trim: true,
        required: [true, 'Question text is a required field']
    },
    options: {
        type: [String],
        trim: true,
        required: [true, 'Options is a required field']
    },
    answer: {
        type: Number,
        min: 0,
        max: 2,
        required: [true, 'Answer is a required field']
    },
    solution: {
        type: String,
        trim: true,
        required: false,
        default: ''
    },
    category: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Question category is a required field']
    },
    questionActive: {
        type: Number,
        default: 1
    }
});

QuestionSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email', 'questionText', 'options', 'answer', 'solution', 'category', 'questionActive']);
}

let Question = mongoose.model('Question', QuestionSchema);

module.exports = { Question };