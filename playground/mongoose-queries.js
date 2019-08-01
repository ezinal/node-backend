const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');

let id = '6d39d2f8fd8dd17d1bde5c2b11';

if (!ObjectID.isValid(id)) {
    console.log('Id not valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(todo);
// });

Todo.findById(id).then((todo) => {
    if (!todo)
        return console.log('Id not found');
    console.log(todo);
}).catch((e) => console.log(e));