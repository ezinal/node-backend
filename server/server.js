const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./user/user.controller');
const QuestionController = require('./question/question.controller');
const CategoryController = require('./category/category.controller');
const SurveyController = require('./survey/survey.controller');
const { authenticate } = require('./middleware/authenticate');
const { mongoose } = require('./db/mongoose');

const port = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

// User API
// router.get('/user/:id', UserController.getById);
// router.get('/users', UserController.all);
// router.post('/user/add', UserController.add);
// router.post('/user/edit', UserController.edit);
// router.post('/user/updateScore', UserController.updateScore);
// //router.get('/create', UserController.create);
// router.post('/user/login/', UserController.login);
// router.delete('/user/:uid', UserController.deactivate);
// router.get('/test', UserController.test);


//CATEGORIES API
app.post('/category/add', CategoryController.add); // add a new category
app.get('/category/showAll', CategoryController.showAll); // get all categories
app.patch('/category/:id', CategoryController.edit); // update existing category
app.delete('/category/:id', CategoryController.delete); // delete existing category


//Question API
app.get('/question/:id', QuestionController.getById); //get individual question by id
app.post('/question', QuestionController.add); // add a question
app.get('/question/showAll', QuestionController.showAll); //show all questions
app.patch('/question/:id', QuestionController.edit); //edit a question
app.delete('/question/:id', QuestionController.delete); //delete a question

//Survey API
app.post('/test', SurveyController.add); // create a new test
app.get('/test/:id', SurveyController.show); // get a test by id
app.delete('/test/:id', SurveyController.delete); // delete a test by id
app.patch('/test/:id', SurveyController.edit); // update a test  

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});