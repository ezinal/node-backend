const mongoose = require('mongoose');

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

let Survey = mongoose.model('Survey', SurveySchema);

module.exports = { Survey };