const { v4: uuidv4 } = require('uuid');
const db = require('../models');

class orderManager {
    create(customerId, paymentId, shippingaddress, totalPrice, status) {
        let currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        let ref = uuidv4();
        db.order.create({
            refno: ref,
            customerId: customerId,
            paymentId: paymentId,
            shippingaddress: shippingaddress,
            totalprice: totalPrice,
            status: status,
            date: currentDate
        });

    }
    update(id, refno, customerId, paymentId, shippingaddress, totalPrice, status) {
        let currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        db.order.update({
            refno: refno,
            customerId: customerId,
            paymentId: paymentId,
            shippingaddress: shippingaddress,
            totalprice: totalPrice,
            status: status,
            date: currentDate
        },
            {
                where: { id: id }
            }

        ).then((order) => console.log('order updated'))
    }
    list() {
        let orders = db.order.findAll();
        return orders;
    }
    delete(id) {
        db.order.destroy({
            where: {
                id: id
            }
        }).then((order) => console.log('deleted'));
    }
    find(id) {
        let order = db.order.findAll({
            where: {
                id: id
            }
        });
        return order;
    }
}
module.exports = orderManager;