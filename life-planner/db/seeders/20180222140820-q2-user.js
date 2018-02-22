'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Users', [
        { name: 'carl', email: 'carl@test.com', createdAt: new Date(), updatedAt: new Date()},
        { name: 'stanley', email: 'stan@test.com', createdAt: new Date(), updatedAt: new Date()},
        { name: 'quentin', email: 'quent@test.com', createdAt: new Date(), updatedAt: new Date()}
      ]);

      const userids = await queryInterface.sequelize.query(`SELECT id from public."Users";`);
      const userRows = userids[0];

          return await queryInterface.bulkInsert('Tasks', [
            { name: 'be a helper', complete: false,  UserId: userRows[0].id, createdAt: new Date(), updatedAt: new Date()},
            { name: 'read a book', complete: false,  UserId: userRows[0].id, createdAt: new Date(), updatedAt: new Date()},
            { name: 'cancel cable subscription', complete: false,  UserId: userRows[0].id, createdAt: new Date(), updatedAt: new Date()}
          ], {});


  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Tasks', null, {});
      await queryInterface.bulkDelete('Users', null, {});
  }
};
