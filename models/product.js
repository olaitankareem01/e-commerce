

// const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define("product", {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.STRING,

  });
  product.associate = models => {
    product.belongsToMany(models.category, {
      through: 'categoryproduct',
      as: "categories",
      foreignKey: "productId"
    });


  };


  return product;


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