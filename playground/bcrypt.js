const bcrypt = require('bcryptjs');

const password = 'my password'

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, function(err, hash) {
//         // Store hash in your password DB.
//         console.log(hash);
//     });
// });

let hashedPassword = '$2a$10$6gsZ5YD5jVYXUG4V7m/1U.nuXbzLIJYMH/9zyGN/bXb3gZag7w6h6';

bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res);
});