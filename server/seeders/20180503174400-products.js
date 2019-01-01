//import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Products', [
    {
      productId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      product: '5 pieces of snails',
      price: '2500',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
        productId: 'e20ac257-86cc-4a6f-a619-0249a2010000',
        product: '10 pieces of snails',
        price: '4800',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        productId: 'e20ac257-86cc-4a6f-a619-0249a202c475',
        product: '50 pieces of snails',
        price: '23000',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        productId: 'e20ac257-86cc-4a6f-a619-0249a204c475',
        product: '100 pieces of snails',
        price: '45000',
        createdAt: new Date(),
        updatedAt: new Date()
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Products', null, {})
};
