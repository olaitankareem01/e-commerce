'use strict';

const { sequelize } = require("../models");

const uuid = require('uuid');
const DataTypes = require("sequelize");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'payments',
        'refno',
        {
          type: Sequelize.UUID,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4()
        }
      ),
      queryInterface.addColumn(
        'payments',
        'date',
        {
          type: Sequelize.DATE,
          allowNull: false,
        })

    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'payments',
        'refno',
      ),
      queryInterface.removeColumn(
        'payments',
        'date',
      )
    ]);
  }
};
