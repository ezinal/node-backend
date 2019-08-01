/**
 * Go to http://mongodb.github.io/node-mongodb-native/2.2/api/Cursor.html
 * and check out more useful functions
 */

const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server.');
    // db.collection('Todos').findOneAndUpdate({ _id: new ObjectID('5d38a64339db4e6ad6f90900') }, {
    //     $set: { completed: true }
    // }, {
    //     returnOriginal: false
    // }).then((res) => {
    //     console.log(res);
    // });
    db.collection('Users').findOneAndUpdate({ _id: new ObjectID('5d3932aea289bc613f76813b') }, {
        $set: { name: 'Jen' },
        $inc: { age: 1 }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res);
    });
    // db.close();
});