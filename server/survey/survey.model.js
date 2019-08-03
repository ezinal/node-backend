const mongoose = require('mongoose');
const _ = require('lodash');

var SurveySchema = new mongoose.Schema({
    surveyName: {
        type: String,
        trim: true,
        required: [true, 'Survey name is a required field']
    },
    questions: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    category: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Survey category is a required field']
    }
});


SurveySchema.methods.toJSON = function() {
    var survey = this;
    var surveyObject = survey.toObject();

    return _.pick(surveyObject, ['_id', 'surveyName', 'category']);
}

let Survey = mongoose.model('Survey', SurveySchema);

module.exports = { Survey };