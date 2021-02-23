const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const customerManager = require('../services/customerservices.js')
const customerMg = new customerManager();
const router = express.Router();
router.use(bodyparser());
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));


router.get('/', async (req, res) => {
    let customers = await customerMg.list();
    console.log(customers);
    res.send(customers).status(200)
});

router.get('/:id', async (req, res) => {
    let id = req.params.id
    let customer = await customerMg.find(id);
    if (customer.length == 0) {
        res.send('customer not found').status(404);
    }
    else {
        res.send(customer).status(200);
    }
});

router.post('/createcustomer', async (req, res) => {
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let Address = req.body.address;
    let State = req.body.state;
    let country = req.body.country;
    let phoneNo = req.body.phoneno;
    await customerMg.create(firstName, lastName, email, password, Address, State, country, phoneNo);
    res.status(200).send('customer added successfully');
});

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    let address = req.body.address;
    let state = req.body.state;
    let country = req.body.country;
    let phoneNo = req.body.phoneno;
    let searchResult = await customerMg.find(id);
    if (searchResult.length == 0) {
        res.send('customer not found').status(404);
    }
    else {
        await customerMg.update(id, firstName, lastName, email, password, address, state, country, phoneNo);
        res.send('updated!').status(200);
    }
});

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    let searchResult = await customerMg.find(id);
    if (searchResult == 0) {
        res.send('customer not found').status(404);
    }
    else {
        await customerMg.delete(id);
        res.status(200).send('customer deleted');
    }

});

module.exports = router;