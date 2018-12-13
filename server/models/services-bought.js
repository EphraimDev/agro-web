import Sequelize from 'sequelize';

export default (sequelize)  => {
  const ServicesBought = sequelize.define('ServicesBought', {
    servicesId: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    service: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('Pending', 'Started', 'Delivered', 'Canceled'),
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
  ServicesBought.associate = function(models) {
    // associations can be defined here
  };
  return ServicesBought;
};