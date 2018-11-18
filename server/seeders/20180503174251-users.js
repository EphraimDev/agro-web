import bcrypt from 'bcrypt';

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    {
      userId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      firstname: 'Admin',
      lastname: 'Admin',
      email: 'admin@wizzyagro.com',
      username: 'otseobande',
      password: bcrypt.hashSync('admin', 12),
      confirmed: true
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
