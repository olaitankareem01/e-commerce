const db = require('../models');

class orderproductManager {

    create(quantity, orderId, productId, subtotal) {
        db.orderproduct.create(
            {
                quantity: quantity,
                productId: productId,
                orderId: orderId,
                subtotal: subtotal
            }).then(() => console.log('successful'));

    }
    update(id, quantity, orderId, productId, subtotal) {
        db.orderproduct.update({
            quantity: quantity,
            productId: productId,
            orderId: orderId,
            subtotal: subtotal
        },
            {
                where: { id: id }
            }

        ).then((orderproduct) => console.log('updated'));
    }
    async list() {
        let orderproducts = await db.orderproduct.findAll();
        return orderproducts;
    }
    delete(id) {
        db.orderproduct.destroy({
            where: {
                id: id
            }
        }).then((orderproduct) => console.log('deleted'));
    }
    async find(id) {
        let orderproduct = await db.orderproduct.findAll({
            where: {
                id: id
            }
        });
        return orderproduct;
    }
}
module.exports = orderproductManager;
