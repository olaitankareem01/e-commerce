const db = require('../models');
const category = require('../models/category');
const categoryproduct = require('../models/categoryproducts');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
class productManager {
    create(name, price, description, imageUrl) {
        db.product.create({
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl
        }).then(() => console.log(' product creation successful'));
    }
    update(id, name, price, description, imageUrl) {
        db.product.update({
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl
        },
            {
                where: { id: id }
            }

        ).then((product) => console.log('product updated'));
    }
    async list() {
        let products = await db.product.findAll({
            // include: [
            //     {
            //         model: categoryproduct,
            //         as: 'categories',
            //         attributes: ["id", "categoryName"],
            //         through: {
            //             attributes: ["categoryId"]
            //         }
            //     }
            // ]
        });
        return products;
    }
    delete(id) {
        db.product.destroy({
            where: {
                id: id
            }
        }).then((product) => console.log('product deleted'));
    }
    find(id) {
        let products = db.product.findAll({
            where: {
                id: id
            }
        });
        return products;
    }
    async getByCategory(categoryId) {
        let productsInCategory = await sequelize.query(
            `select p.* from products p left join categoryproducts pc on pc.productId = p.id where categoryId=${categoryId};`,
            {
                type: QueryTypes.SELECT
            }
        )
        return productsInCategory;
    }
    async searchProducts(searchstring) {
        let products = await sequelize.query(
            `select * from products where name  like '%${searchstring}%';`,
            {

                type: QueryTypes.SELECT
            }
        )
        return products;
    }
}
module.exports = productManager;
