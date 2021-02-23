const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const feedbackManager = require('../services/feedbackservices.js')
const feedbackMg = new feedbackManager();
const router = express.Router();
router.use(bodyparser());
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));

//gets all feedbacks
router.get('/', async (req, res) => {
    let feedbacks = await feedbackMg.list();
    res.send(feedbacks).status(200)
});
//gets a specific  feedback
router.get('/:id', async (req, res) => {
    let id = req.params.id
    let feedBack = await feedbackMg.find(id);
    if (feedBack.length == 0) {
        res.send('feedback not found').status(404);
    }
    else {
        res.send(feedBack).status(200);
    }
});
//submits a new feedback
router.post('/', async (req, res) => {
    let Message = req.body.message;
    let customerId = req.body.customerId;
    await feedbackMg.create(message, customerId);
    res.status(200).send('feedback submitted successfully');
});
//updates a feedback
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let message = req.body.message;
    let customerId = req.body.customerId;
    let searchResult = await feedbackMg.find(id);
    if (searchResult.length == 0) {
        res.send('feedback not found').status(404);
    }
    else {
        await feedbackMg.update(id, message, customerId);
        res.send('updated!').status(200);
    }
});
//deletes a feedback
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    let searchResult = await feedbackMg.find(id);
    if (searchResult.length == 0) {
        res.send('feedback not found').status(404);
    }
    else {
        await feedbackMg.delete(id);
        res.status(200).send('feedback deleted');
    }

});

module.exports = router;