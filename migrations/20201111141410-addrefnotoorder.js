'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'orders',
      'refno',
      {
        allowNull: false,
        type: Sequelize.UUID,
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
      'orders',
      'refno'
    )
  }
};
