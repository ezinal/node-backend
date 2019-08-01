const { MongoClient, ObjectID } = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server.');
    // db.collection('Todos').insertOne({
    //     text: 'Sth to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));

    // });
    //Insert new doc into Users(name , age, loc)  
    db.collection('Users').insertOne({
        name: 'Emre',
        age: 22,
        location: 'Adana'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert new record', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 2));
    });
    db.close();
});