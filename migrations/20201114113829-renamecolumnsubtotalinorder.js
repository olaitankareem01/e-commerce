'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('orderproducts', 'subtotal', 'unitprice', {
    })

  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('orderproducts', 'subtotal', 'unitprice', {
    })
  }
};
