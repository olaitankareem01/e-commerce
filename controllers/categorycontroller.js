const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const categoryManager = require('../services/categoryservices.js');
const categoryMg = new categoryManager();
const router = express.Router();
router.use(bodyparser());
router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ extended: false }));


router.get('/', async (req, res) => {
    let categories = await categoryMg.list();
    console.log(categories);
    res.send(categories).status(200)
});
router.get('/getcategory/:id', async (req, res) => {
    let id = req.params.id
    let category = await categoryMg.find(id);
    if (category == undefined) {
        res.send('category not found').status(404);
    }
    else {
        res.send(category[0]).status(200);
    }
});
router.get('/supercategories', async (req, res) => {
    let superCategories = await categoryMg.getSuperCategories();
    console.log(superCategories);
    res.send(superCategories).status(200);
});
router.get('/subcategories/:parentId', async (req, res) => {
    let subCategoryId = req.params.parentId;
    let subCategories = await categoryMg.getSubCategories(subCategoryId);
    console.log(subCategories);
    res.send(subCategories).status(200);
})
router.post('/', async (req, res) => {
    let categoryname = req.body.categoryName;
    let parentid = req.body.parentId;
    await categoryMg.create(categoryname, parentid);
    res.status(200).send('creation successful');
});
router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let categoryname = req.body.categoryName;
    let parentid = req.body.parentId;
    let category = await categoryMg.find(id);
    if (category.length == 0) {
        res.send('category not found').status(404);
    }
    else {
        await categoryMg.update(id, categoryname, parentid);
        res.send('updated!').status(200);
    }
})
router.delete('/delete/:id', async (req, res) => {
    let Id = req.params.id;
    await categoryMg.delete(Id);
    res.status(200).send('category deleted');
});


module.exports = router;