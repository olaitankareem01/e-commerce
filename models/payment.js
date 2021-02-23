'use strict';
const { Model } = require('sequelize');

const uuid = require('uuid');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payment.belongsTo(models.customer);
    }
  };
  payment.init({
    amount: DataTypes.STRING,
    refno: DataTypes.UUID,
    date: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    customerId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'payment',
  });
  // payment.beforeCreate((payment) => {
  //   return payment.refno = uuid();
  // })
  return payment;
};