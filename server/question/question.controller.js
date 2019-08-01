const { Question } = require('./question.model');
const { ObjectID } = require('mongodb');

module.exports.add = function(req, res, next) {
    var question = new Question(req.body);
    question.save().then((doc) => {
        return res.status(200).json({
            message: "Your Question has been added successfully.",
            data: doc
        });
    }, (e) => {
        console.log(e);
        e.status = '400';
        return next(e);
    });
};

module.exports.getById = function(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('Id not valid');
        return res.status(404).send('Not a valid id!');
    }
    Question.findById(id).then((question) => {
        if (!question)
            return res.status(404).send('There is no such question with given id');
        res.send({ question });
    }).catch(
        (e) => { res.status(400).send(); }
    );
};

module.exports.showAll = function(req, res, next) {
    Question.find().then((questions) => {
        if (!questions) {
            return res.status(404).json({
                message: "No questions yet"
            });
        }
        return res.status(200).json({
            message: "Questions found",
            data: questions
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
    Question.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((question) => {
        if (!question)
            return res.status(404).send('There is no such question with given id');
        return res.status(200).json({
            message: "Question updated",
            data: question
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
    Question.findByIdAndRemove(id).then((doc) => {
        if (!doc) {
            return res.status(404).send();
        }
        res.status(200).send(doc);
    }).catch((e) => {
        return res.status(400).send();
    });
};