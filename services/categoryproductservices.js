const db = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

class categoryproductManager {

    create(categoryId, productId) {
        db.categoryproducts.create({
            categoryId: categoryId,
            productId: productId
        }).then(() => console.log('successful'));

    }
    update(id, categoryId, productId) {
        db.categoryproducts.update({
            categoryId: categoryId,
            productId: productId
        },
            {
                where: { id: id }
            }

        ).then((categoryproduct) => console.log('updated'));
    }

    async list() {
        let categoryproducts = await sequelize.query(
            `select p.id, p.name, p.price, p.imageUrl, p.description  from products p left join categoryproducts pc on pc.productId = p.id where pc.categoryId = categoryId`,
            {
                type: QueryTypes.SELECT
            }
        )
        console.log(categoryproducts);
        return categoryproducts;
    }

    delete(id) {
        db.categoryproducts.destroy({
            where: {
                id: id
            }
        }).then((categoryproduct) => console.log('deleted'));
    };

    async find(id) {
        let categoryProduct = await db.categoryproducts.findAll({
            where: {
                id: id
            }
        });
        return categoryProduct;
    }
}
module.exports = categoryproductManager;
