const mongoose = require('mongoose');

var CategorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        trim: true,
        required: [true, 'Category name is a required field']
    },
    surveys: {
        type: [mongoose.Schema.Types.ObjectId]
    }
});

let Category = mongoose.model('Category', CategorySchema);

module.exports = { Category };