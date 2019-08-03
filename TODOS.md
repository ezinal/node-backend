0-Test authentication with token usage

0.1-Add other necessary /user routes

0.2-Change route orders from specific to general

0.3-When user update his/her password should be hashed again
    -Check if middleware works
    -Wrote a new route changePassword - doesnt work
    -what happens when a user tries to update to a one-char password


0.4-Update login logic according to quiz app

0.5-Add account activate deactivate methods and email verification code

0.6-Add google-facebook account verification

0.7-Write a client web interface for initial category-question-survey addings

0.8-Write additional configuration?

0.9-Users should be able to use multiple devices (multiple tokens)

1- There are 2 different get requests in user routes. combine them a user either uses token or get by id
    https://stackoverflow.com/questions/10020099/express-js-routing-optional-slpat-param
    This works for /path and /path/foo on express 4, note the * before ?.

    router.get('/path/:id*?', function(req, res, next) {
        res.render('page', { title: req.params.id });
    });

2-Steps to make a route private
    1-add authenticate keyword to route (now we have access to user and token)
    2-change controller function (findbyid to findOne (bec. with findOne we can also query with _id))

3-Get heroku mongodb uri - set up a mlab account
    setting JWT_SECRET: heroku config:set JWT_SECRET=oopiwepriu344198iopuipu
    Use mongodb url (from mlabs) to fill in robomongo authentication
    