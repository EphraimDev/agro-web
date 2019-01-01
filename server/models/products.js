import Sequelize from 'sequelize';

export default (sequelize)  => {
  const Products = sequelize.define('Products', {
    productId: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    product: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {});
  Products.associate = function(models) {
    // associations can be defined here
  };
  return Products;
};