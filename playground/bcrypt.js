const bcrypt = require('bcryptjs');

const password = 'Red12345!'
let hashedVal;

bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash("my password", salt, function(err, hash) {
        // Store hash in your password DB.
        bcrypt.compare('my password', hash).then((isMatch) => {
          console.log('isMatch: ',isMatch)
        })
    });
});

// The hashed password is what would be stored in the database
