const mongoose = require('mongoose');
const _ = require('lodash');

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

CategorySchema.methods.toJSON = function() {
    var category = this;
    var categoryObject = category.toObject();

    return _.pick(categoryObject, ['_id', 'categoryName']);
}

let Category = mongoose.model('Category', CategorySchema);

module.exports = { Category };