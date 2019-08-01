const { Survey } = require('./survey.model');
const { ObjectID } = require('mongodb');

module.exports.add = function(req, res, next) {
    var survey = new Survey(req.body);
    survey.save().then((doc) => {
        return res.status(200).json({
            message: "New Survey has been added successfully.",
            data: doc
        });
    }, (e) => {
        console.log(e);
        e.status = '400';
        return next(e);
    });
};

module.exports.show = function(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('Id not valid');
        return res.status(404).send();
    }
    Survey.findById(id).then((survey) => {
        if (!survey)
            return res.status(404).send('There is no such survey with given id');
        res.send({ survey });
    }).catch(
        (e) => { res.status(400).send(); }
    );
};

module.exports.edit = function(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('Id not valid');
        return res.status(404).send();
    }
    Survey.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((survey) => {
        if (!survey)
            return res.status(404).send('There is no such survey with given id');
        return res.status(200).json({
            message: "Survey updated",
            data: survey
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
        return res.status(404).send();
    }
    Survey.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.status(200).send(doc);
    }).catch((e) => {
        return res.status(400).send();
    });
};