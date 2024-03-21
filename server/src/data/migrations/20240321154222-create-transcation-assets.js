"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("TranscationAssets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Nama tabel Role yang ingin Anda hubungkan
          key: "id", // Kolom yang akan dihubungkan
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      assetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Assets", // Nama tabel Role yang ingin Anda hubungkan
          key: "id", // Kolom yang akan dihubungkan
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      typeTransactionAssetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "TypeTransactionAssets", // Nama tabel Role yang ingin Anda hubungkan
          key: "id", // Kolom yang akan dihubungkan
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      reasonRequest: {
        type: Sequelize.STRING,
      },
      reasonReject: {
        type: Sequelize.STRING,
      },
      statusTransactionAssetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "StatusTransactionAssets", // Nama tabel Role yang ingin Anda hubungkan
          key: "id", // Kolom yang akan dihubungkan
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      manageBy: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users", // Nama tabel Role yang ingin Anda hubungkan
          key: "id", // Kolom yang akan dihubungkan
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("TranscationAssets");
  },
};
