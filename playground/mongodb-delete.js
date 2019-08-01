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
    //deleteMany
    // db.collection('Todos').deleteMany({ text: 'Eat lunch' }).then((result) => {
    //     console.log(result);
    // });
    //deleteOne
    // db.collection('Todos').deleteOne({ text: 'Eat lunch' }).then((res) => {
    //     console.log(res);
    // });
    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({ completed: false }).then((res) => {
    //     console.log(res);
    // });
    db.collection('Users').deleteMany({ name: 'Emre' }).then((res) => {
        console.log(res);
    });
    db.collection('Users').deleteOne({ _id: new ObjectID('5d388d2439db4e6ad6f90115') }).then((res) => {
            console.log(res);
        })
        // db.close();
});