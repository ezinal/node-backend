const { Category } = require('./category.model');
const { ObjectID } = require('mongodb');

module.exports.add = function(req, res, next) {
    var category = new Category(req.body);
    category.save().then((doc) => {
        return res.status(200).json({
            message: "New Category has been added successfully.",
            data: doc
        });
    }, (e) => {
        console.log(e);
        e.status = '400';
        return next(e);
    });
};

module.exports.showAll = function(req, res, next) {
    Category.find().then((categories) => {
        if (categories === undefined || categories.length == 0) {
            return res.status(404).json({
                message: "No categories yet"
            });
        }
        return res.status(200).json({
            message: "Categories found",
            data: categories
        });
    }, (e) => {
        console.log(e);
        e.status = '400';
        return next(e);
    });
};

module.exports.edit = function(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('Id not valid');
        return res.status(404).send('Not a valid id!');
    }
    Category.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((category) => {
        if (!category)
            return res.status(404).send('There is no such category with given id');
        return res.status(200).json({
            message: "Category updated",
            data: category
        });
    }).catch((e) => {
        console.log(e);
        e.status = '400';
        return next(e);
    });
};

module.exports.delete = function(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('Id not valid');
        return res.status(404).send('Not a valid id!');
    }
    Category.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.status(200).send(doc);
    }).catch((e) => {
        return res.status(400).send();
    });
};