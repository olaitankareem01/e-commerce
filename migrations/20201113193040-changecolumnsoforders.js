'use strict';
const uuid = require('uuid');
const DataTypes = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn(
        'orders',
        'refno',
        {
          type: Sequelize.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4()
        }
      ),
      queryInterface.changeColumn(
        'orders',
        'date',
        {
          type: Sequelize.DATE,
          allowNull: false,
        }),
      queryInterface.changeColumn(
        'orders',
        'status',
        {
          type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
          defaultvalue: 'pending',
          allowNull: false
        },
      ),

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'orders',
        'refno'
      ),
      queryInterface.removeColumn(
        'orders',
        'date'
      ),
      queryInterface.removeColumn(
        'orders',
        'status'
      )
    ]);


  }
};
