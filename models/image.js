

module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define("image", {
    url: DataTypes.STRING,
    productId: DataTypes.INTEGER,

  });
  image.associate = models => {
    image.belongsTo(models.product);
    // as: 'image',
    // foreignKey: 'productId'
  };


  return image;


}


// import { Model } from 'sequelize';
// export default (sequelize, DataTypes) => {
//   class product extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       product.hasMany(models.brand);
//       product.hasMany(models.image);
//     }
//   };
//   product.init({
//     name: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'product',
//   });
//   return product;
// };

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class image extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//       image.belongsTo(models.product);
//     }
//   };
//   image.init({
//     url: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'image',
//   });
//   return image;
// };