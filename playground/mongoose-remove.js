const { ObjectID } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then((result) => { //remove all
//     console.log(result);
// });

Todo.findByIdAndRemove('5d3b3f24b9d1c5dc5b1cb940').then((todo) => {
    console.log(todo);
});