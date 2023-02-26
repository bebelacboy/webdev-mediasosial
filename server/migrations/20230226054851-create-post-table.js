'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('post', { 
      user: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'User',
          key: 'username'
        }
      },
      postId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('post');
  }
};
