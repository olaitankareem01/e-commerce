const db = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

class categoryManager {

    create(categoryName, parentId) {
        db.category.create({
            categoryName: categoryName,
            parentId: parentId
        }).then(() => console.log('successful'));

    }
    async update(id, categoryName, parentId) {
        await db.category.update({
            categoryName: categoryName,
            parentId: parentId
        },
            {
                where: { id: id }
            }

        ).then((category) => console.log('updated'));
    }
    async list() {
        let result = await db.category.findAll();
        return result;
    }




    delete(id) {
        let result = db.category.destroy({
            where: {
                id: id
            }
        }).then((category) => console.log('deleted'));
        return result;
    }
    async find(id) {
        let result = await db.category.findAll({
            where: {
                id: id
            }
        });
        return result;

    }
    async getCategoryName(categoryId) {
        let categoryname = await sequelize.query(
            `SELECT categoryName from categories WHERE id = ${categoryId}`,
            {
                type: QueryTypes.SELECT
            }
        )
        console.log(categoryname);
        return categoryname;
    }
    async getSuperCategories() {
        let superCategories = await sequelize.query(
            `SELECT id,categoryName from categories WHERE parentId is null`,
            {
                type: QueryTypes.SELECT
            }
        )
        // console.log(superCategories);
        return superCategories;
    }
    async getSubCategories(superCategoryId) {
        let result = await db.category.findAll({
            where: {
                parentId: superCategoryId
            }
        });
        return result;

    }

}
module.exports = categoryManager;
