'use strict';
const uuid = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.customer);
    }
  };
  order.init({
    date: DataTypes.DATE,
    refno: DataTypes.UUID,
    date: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    customerId: DataTypes.INTEGER,
    paymentId: DataTypes.INTEGER,
    shippingaddress: DataTypes.STRING,
    totalprice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order',
  });
  // order.beforeCreate((user, _) => {
  //   return user.refno = uuid();
  // });
  return order;
};