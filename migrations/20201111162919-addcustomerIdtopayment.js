'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'payments',
        'customerId', {
        allowNull: false,
        type: Sequelize.INTEGER,
        foreignKey: true,
        references: {
          model: 'customers',
          key: 'Id'
        },

        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
      )
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return promise.all([
      queryInterface.removeColumn(
        'payments',
        'customerId'
      )
    ]);

  }
};
