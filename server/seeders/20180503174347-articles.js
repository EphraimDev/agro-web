//import bcrypt from 'bcrypt';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Articles', [
    {
      articleId: 'e20ac257-86cc-4a6f-a619-0249a201c475',
      title: 'Agriculture is the future',
      image: 'https://i.imgur.com/S7IPpnK.jpg',
      article: `In the past, Nigeria was famous for the export of groundnut and palm kernel oil. But over the years the rate of export of this produce has reduced. A few years back local Nigerian companies has commenced exporting groundnuts, cashew nuts, sesame seeds, moringa seeds etc. Local company such as Lantbruk Global Integrated Services Limited has paved the way for other firms to continue in elevating Nigeria agricultural system.

      The country's agricultural products fall into two main groups: food crops produced for home consumption, and exports. Prior to the Nigerian civil war, the country was self-sufficient in food, but increased steeply after 1973. Bread made from American wheat replaced domestic crops as the cheapest staple food.[5] Between 1980 to 2016, Yam production increased from more than 5 million tonnes to 44 million tonnes.
      Cocoa
      Cocoa is the leading non-oil foreign exchange earner but the dominance of smallholders and lack of farm labor due to urbanization hold back production. In 1969, Nigeria produced 145,000 tons of cocoa beans, but has the potential for over 300,000 per year. For more productivity, Nigerian Government should give more incentives to cocoa farmers[5]
      
      Rubber is the second-largest non-oil foreign exchange earner.
      
      Oil Palm
      The palms industry constitutes a significant sector of the Nigerian economy, providing food and raw materials for the Food, Cosmetics, Pharmaceuticals, Plastics and the Bio-energy industries. In Nigeria the institute that has valuable information about oil palm is the Nigerian Institute for Oil Palm Research. The formal mandate of the institute is to conduct research into the production and products of oil palm and other palms of economic importance and transfer its research findings to farmers.[17]`
    },
    {
      articleId: 'ba8e1fd3-926f-44c9-a7b3-218aedab8c12',
      title: 'Rice farming',
      image: 'https://i.imgur.com/6uLB90p.jpg',
      article: `Interestingly, Nigeria, which is the largest producer of rice in West Africa and the third in Africa after Egypt and Madagascar producing about 3 million metric tons on the average annually, falls short of meeting its local demand which is placed at about 5 million tons. This particular statistic makes her the highest consumer of rice in the West African sub region and the second largest importer in the world, buying at least 2 million tons annually. Massive importation of the product from countries like India, China, Thailand etc, therefore, occur largely on account of the fact that the estimated amount of rice milled locally is placed at 1.8 million tons. On the average, Nigeria spends 1 billion Naira on rice importation daily (that’s a grueling 365 billion Naira annually). Agriculturalists keep asking ”why spend such an outrageous amount of money importing rice when Nigeria has the potential of growing enough rice to support Her population and generate surplus that can be exported?”.`
    },
    {
      articleId: 'fa56c9e7-e5f4-4086-b7e9-db581201b71f',
      title: 'Cassava Farming',
      image: 'https://i.imgur.com/BmZVuX9.jpg',
      article: `It is unfortunate to see many Nigerians go to bed hungry, suffering of starvation and malnutrition. We constantly complain of lack of good paying jobs and no money to spend and take care of our immediate needs. In effort to get jobs, we sell themselves into slavery in the hands of Chinese and Lebanese right in their own country all in the name of working in a factory. While in reality, we are sitting on a goldmine known as cassava farming and production!

      Cassava grows very well in most parts of West Africa like Ghana, Senegal, Benin Republic, Nigeria, and Cameroon. The Brazilians are also know for cassava farming which they use for Tapioca production.
      
      The industrial processing of cassava in Nigeria holds much potential for successful investment.  The crop is increasingly attracting attention of serious business people. And processing businesses are slowly starting to spring-up all over the country. You also know how useful cassava is to Nigerians in general in terms of consumption. Cassava forms the major part of our daily food. Almost no family can survive  a whole year without cassava related food.`
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Articles', null, {})
};
