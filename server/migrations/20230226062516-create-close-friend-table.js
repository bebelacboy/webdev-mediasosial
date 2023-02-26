'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('close_friend', { 
      username_src: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
         model: 'User',
         key: 'username',
        }
      },
      username_dest: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'User',
          key: 'username',
        }
      }
      });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('close_friend');
  }
};
