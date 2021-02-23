const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const paymentManager = require('../services/paymentservices.js');
const paymentMg = new paymentManager();
const router = express.Router();
router.use(bodyparser());
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));
let ref = uuidv4();


router.get('/', async (req, res) => {
    let payments = await paymentMg.list();
    res.send(payments).status(200)
});
router.get('/:id', async (req, res) => {
    let id = req.params.id
    let payment = await paymentMg.find(id);
    if (payment.length == 0) {
        res.send('order not found').status(404);
    }
    else {
        res.send(payment).status(200)
    }

});
router.post('/', async (req, res) => {
    let customerId = req.body.customerId;
    let paymentId = req.body.paymentId;
    let shippingAddress = req.body.shippingaddress;
    let totalPrice = req.body.totalPrice;
    await orderMg.create(customerId, paymentId, shippingAddress, totalPrice);
    res.status(200).send('creation successful');
});
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let refno = req.body.refno;
    let customerId = req.body.customerId;
    let amount = req.body.amount;
    let status = req.body.status;
    let payment = await paymentMg.find(id);
    if (payment.length == 0) {
        res.send('payment details not found').status(404);
    }
    else {
        await paymentMg.update(id, refno, amount, customerId, status);
        res.send('updated!').status(200);
    }
})
router.delete('/:id', async (req, res) => {
    let Id = req.params.id;
    let payment = await paymentMg.find(Id);
    if (payment.length == 0) {
        res.send('payment not found').status(404);
    }
    else {
        await paymentMg.delete(Id);
        res.status(200).send('payment deleted');
    }

});

module.exports = router;