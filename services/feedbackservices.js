
const db = require('../models');

class feedbackManager {

    create(message, customerId) {
        db.feedback.create({
            message: message,
            customerId: customerId
        }).then(() => console.log('successful'));
    }
    update(id, message, customerId) {
        db.feedback.update({
            message: message,
            customerId: customerId
        },
            {
                where: { id: id }
            }

        ).then((feedback) => console.log('updated'));
    }
    async list() {
        let feedbacks = await db.feedback.findAll();
        return feedbacks;
    }
    delete(id) {
        db.feedback.destroy({
            where: {
                id: id
            }
        }).then((feedback) => console.log('deleted'));
    }
    find(id) {
        db.feedback.findAll({
            where: {
                id: id
            }
        }).then((feedback) => console.log(feedback));
    }
}
module.exports = feedbackManager;
