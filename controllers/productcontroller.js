const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const productManager = require('../services/productservices.js');
const productMg = new productManager();
const categoryManager = require('../services/categoryservices.js');
const categoryMg = new categoryManager();
const router = express.Router();
router.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 100000 }));
router.use('/uploads', express.static('./uploads'));
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }

});
const uploadImg = multer({ storage: storage });


router.get('/', async (req, res) => {
    let products = await productMg.list();
    res.send(products).status(200)
});
router.get('/:id', async (req, res) => {
    let id = req.params.id
    let product = await productMg.find(id);
    // if (product.length == 0) {
    //     res.send('product not found').status(404);
    // }
    // else {
    //     res.send(product).status(200);
    //     console.log(product)
    // }
    res.send(product[0]).status(200);
});
router.get('/productincategory/:categoryId', async (req, res) => {
    let categoryId = req.params.categoryId
    let category = await categoryMg.find(categoryId);
    if (category.length == 0) {
        res.send('category not found').status(404);
    }
    else {
        let productInCategories = await productMg.getByCategory(categoryId);
        res.send(productInCategories).status(200);
    }
});
router.post('/', uploadImg.single('imageUrl'), async (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let imageUrl = req.file.path;
    console.log(imageUrl);
    await productMg.create(name, price, description, imageUrl);
    res.status(200).send('creation successful');
});

router.put('/:id', uploadImg.single('imageUrl'), async (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let price = req.body.price;
    let description = req.body.description;
    let imageUrl = req.file.path;
    let product = await productMg.find(id);
    if (product.length == 0) {
        res.send('product not found').status(404);
    }
    else {
        await productMg.update(id, name, price, description, imageUrl);
        res.send('updated!').status(200);
    }
})
router.delete('/:id', async (req, res) => {
    let Id = req.params.id;
    let product = await productMg.find(Id);
    if (product.length == 0) {
        res.send('product not found').status(404);
    }
    else {
        await productMg.delete(Id);
        res.send('product deleted!').status(200);
    }

});
router.get('/searchproducts/:searchparam', async (req, res) => {
    let searchString = req.params.searchparam
    let searchText = JSON.stringify(searchString);

    console.log(searchText);

    let products = await productMg.searchProducts(searchString);
    res.send(products).status(200);

});
productMg.getByCategory(1);

// productMg.searchByCategory(2);

module.exports = router;