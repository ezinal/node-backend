const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

const { User } = require('./user.model');

module.exports.add = function(req, res, next) {
    var user = new User(req.body);

    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
};

module.exports.getById = function(req, res, next) {
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('Id not valid');
        return res.status(404).send('Not a valid id!');
    }
    User.findById(id).then((user) => {
        if (!user)
            return res.status(404).send('There is no such user with given id');
        res.send({ user });
    }).catch(
        (e) => { res.status(400).send(); }
    );
};

module.exports.login = function(req, res, next) {
    let body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        res.status(400).send();
    })
};

module.exports.getCurrentUser = function(req, res, next) {
    res.send(req.user);
};

module.exports.logout = (req, res, next) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
};