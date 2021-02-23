'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'feedbacks',
      'customerId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'customers',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }

    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'feedbacks',
      'customerId'
    )
  }
};
