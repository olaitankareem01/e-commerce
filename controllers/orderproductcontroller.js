const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const orderproductManager = require('../services/orderproductservices.js');
const orderproductMg = new orderproductManager();
const router = express.Router();
router.use(bodyparser());
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));
let ref = uuidv4();


router.get('/', async (req, res) => {
    let orderproducts = await orderproductMg.list();
    res.send(orderproducts).status(200)
});
router.get('/:id', async (req, res) => {
    let id = req.params.id
    let orderproduct = await orderproductMg.find(id);
    if (orderproduct.length == 0) {
        res.send('order product not found').status(404);
    }
    else {
        res.send(orderproduct).status(200)
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
    console.log(customerId);
    let paymentId = req.body.paymentId;
    let shippingAddress = req.body.shippingaddress;
    console.log(shippingAddress)
    let totalPrice = req.body.totalprice;
    let order = await orderMg.find(id);
    if (order.length == 0) {
        res.send('order not found').status(404);
    }
    else {
        await orderMg.update(id, refno, customerId, paymentId, shippingAddress, totalPrice);
        res.send('updated!').status(200);
    }
})
router.delete('/:id', async (req, res) => {
    let Id = req.params.id;
    let order = await orderMg.find(Id);
    if (order.length == 0) {
        res.send('order not found').status(404);
    }
    else {
        await orderMg.delete(Id);
        res.status(200).send('order deleted');
    }

});

module.exports = router;