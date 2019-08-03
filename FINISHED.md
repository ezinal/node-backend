0.3-When user update his/her password should be hashed again
    -Check if middleware works
    -Wrote a new route changePassword
    -what happens when a user tries to update to a one-char password
    -Mongoose middleware is not invoked on update() operations, so you must use a save() if you want to update user passwords.
     (http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt)

==>Done now: I removed mongoose middleware ( schema.pre('save', ... ) ) and replaced it with hardcoded hashing function
==>Done now: Added password length check inside of this routes function 
