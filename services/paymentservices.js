
const db = require('../models');
class paymentManager {
    create(amount, refno, customerId, status) {
        let currentDate = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        db.payment.create({
            amount: amount,
            date: currentDate,
            refno: refno,
            status: status,
            customerId: customerId
        }).then(() => console.log(' product creation successful'));
    }
    update(id, refno, amount, customerId, status,) {
        db.payment.update({
            refno: refno,
            amount: amount,
            status: status,
            customerId: customerId
        },
            {
                where: { id: id }
            }

        ).then((payment) => console.log('updated'));
    }
    async list() {
        let payments = await db.payment.findAll();
        return payments;
    }
    delete(id) {

        db.payment.destroy({
            where: {
                id: id
            }
        }).then((payment) => console.log('deleted'));
    }
    async find(id) {
        let payment = await db.payment.findAll({
            where: {
                id: id
            }
        });
        return payment;
    }
}
module.exports = paymentManager;
