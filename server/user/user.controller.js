const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const { User } = require('./user.model');

module.exports.getById = function(req, res, next) {
    let id = req.params.id;
    User.findById(id).then((err, user) => {
        if (err) {
            err.status = 404;
            return next(err);
        }
        return res.status(200).json({ message: null, data: user });
    }).catch((e) => console.log(e));
};