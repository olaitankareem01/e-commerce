'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('categories', 'name', 'categoryName', {
      }),

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([

      queryInterface.removeColumn('categories', 'name', 'categoryName', {
      }),
    ]);
  }
};
