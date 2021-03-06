import Sequelize from 'sequelize';

export default (sequelize)  => {
  const ProductsBought = sequelize.define('ProductsBought', {
    productsId: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    product: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('Pending', 'Canceled', 'Delivered', 'In Transit'),
      allowNull: false,
      defaultValue: 'Pending'
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true
    },
    userId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      allowNull: false,
      references: {
        model: 'Users',
        key: 'userId',
        as: 'userId'
      }
    }
  }, {});
  ProductsBought.associate = function(models) {
    // associations can be defined here
  };
  return ProductsBought;
};