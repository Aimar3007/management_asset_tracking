"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DetailAssets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      electronicAssetsId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ElectronicAssets",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      storageType: {
        type: Sequelize.STRING,
      },
      storageSize: {
        type: Sequelize.STRING,
      },
      storageConfiguration: {
        type: Sequelize.STRING,
      },
      ramType: {
        type: Sequelize.STRING,
      },
      ramSize: {
        type: Sequelize.STRING,
      },
      ramConfiguration: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DetailAssets");
  },
};
