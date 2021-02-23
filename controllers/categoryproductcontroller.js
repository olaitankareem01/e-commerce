const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const categoryproductManager = require('../services/categoryproductservices.js');
const categoryproductMg = new categoryproductManager();
const router = express.Router();
router.use(bodyparser());
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));


router.get('/', async (req, res) => {
    let categoryproducts = await categoryproductMg.list();
    res.send(categoryproducts).status(200)
});
router.get('/:id', async (req, res) => {
    let id = req.params.id
    let categoryproduct = await categoryproductMg.find(id);
    if (categoryproduct.length == 0) {
        res.send('product category not found').status(404);
    }
    else {
        res.send(categoryproduct).status(200);
    }

});
router.post('/', async (req, res) => {
    let categoryId = req.body.categoryId;
    let productId = req.body.productId;
    await categoryproductMg.create(categoryId, productId);
    res.status(200).send('creation successful');
});
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let categoryId = req.body.categoryId;
    let productId = req.body.productId;
    let categoryproduct = await categoryproductMg.find(id);
    if (categoryproduct.length == 0) {
        res.send('product category not found').status(404);
    }
    else {
        await categoryproductMg.update(id, categoryId, productId);
        res.send('updated!').status(200);
    }
})
router.delete('/:id', async (req, res) => {
    let Id = req.params.id;
    await categoryproductMg.delete(Id);
    res.status(200).send(' product category deleted');
});

module.exports = router;