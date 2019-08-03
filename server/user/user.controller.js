const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const bcrypt = require('bcryptjs');

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
        res.send(user);
    }).catch(
        (e) => { res.status(400).send(); }
    );
};

module.exports.edit = function(req, res, next) {
    console.log('Inside user edit function');
    let id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log('Id not valid');
        return res.status(404).send('Not a valid id!');
    }
    User.findById(id).then((user) => {
        if (!user)
            return res.status(400).send('Id not found');
        if (user.isModified('password')) {
            res.status(400).send('Password should only be modified using changePassword route');
        }
    }).catch((e) => console.log(e));

    User.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then((user) => {
        if (!user)
            return res.status(404).send('There is no such user with given id');
        return res.status(200).json({
            message: "User updated",
            data: user
        });
    }).catch((e) => {
        console.log(e);
        e.status = '400';
        return next(e);
    });
};

module.exports.changePassword = function(req, res, next) {
    console.log('Inside change password function');
    // res.send(req.body);
    let id = req.params.id;
    let pass = req.body.password;
    if (pass.length < 6) {
        res.status(400).send('Password length should be greater than 5');
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(pass, salt, (err, hash) => {
            User.findByIdAndUpdate(id, { password: hash }, { new: true }).then((user) => {
                if (!user)
                    return res.status(404).send('There is no such user with given id');

                return res.status(200).json({
                    message: "User updated",
                    data: user
                });
            }).catch((e) => {
                console.log(e);
                e.status = '400';
                return next(e);
            });
        });
    });

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