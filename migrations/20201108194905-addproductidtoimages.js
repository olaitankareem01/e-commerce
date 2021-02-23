'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'images',
      'productId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'products',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'images',
      'productId',
    );

  }
};
