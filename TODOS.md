0-Test authentication with token usage

1- There are 2 different get requests in user routes. combine them a user either uses token or get by id
    
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
    