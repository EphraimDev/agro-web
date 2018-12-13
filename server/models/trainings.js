import Sequelize from 'sequelize';

export default (sequelize)  => {
  const Trainings = sequelize.define('Trainings', {
    trainingsId: {
      type: Sequelize.UUID,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4
    },
    training: {
      type: Sequelize.STRING,
      allowNull: false
    },
    location: {
      type: Sequelize.ENUM('Virtual', "At Clients Place", "At Wizzy Agro Farm"),
      allowNull: false,
      defaultValue: 'Virtual'
    },
    duration: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('Canceled', 'Pending', 'Started', 'Ended'),
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
  Trainings.associate = function(models) {
    // associations can be defined here
  };
  return Trainings;
};