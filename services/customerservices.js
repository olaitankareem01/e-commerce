

const db = require('../models');

class customerManager {

    async create(firstName, lastName, email, password, address, state, country, phoneNo) {
        await db.customer.create({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            address: address,
            state: state,
            country: country,
            phoneno: phoneNo

        });

    }
    update(id, firstName, lastName, email, password, address, state, country, phoneNo) {
        db.customer.update({
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
            address: address,
            state: state,
            country: country,
            phoneNo: phoneNo
        },
            {
                where: { id: id }
            }

        ).then((customer) => console.log('updated'));
    }
    async list() {
        let result = await db.customer.findAll();
        return result;
    }
    async delete(id) {
        let deleteQuery = await db.customer.destroy({
            where: {
                id: id
            }
        });
        return deleteQuery;
    }
    async find(id) {
        let findQuery = await db.customer.findAll({
            where: {
                id: id
            }
        });
        return findQuery;
    }
    // getCustomerName(customerId) {
    //     db.customer.findAll({

    //         where: {
    //             id: id
    //         }
    //     }).then((customer) => console.log(customer));
    // }
}

module.exports = customerManager;