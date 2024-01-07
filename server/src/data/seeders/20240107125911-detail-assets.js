"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "DetailAssets",
      Array.from({ length: 20 }, (_, index) => ({
        electronicAssetsId: index + 1,
        storageType: index <= 14 ? "SSD" : "HDD",
        storageSize: index <= 9 ? "500 GB" : index <= 14 ? "1 TB" : "250 GB",
        storageSlots: index <= 9 ? "2" : index <= 14 ? "3" : "1",
        ramType: index <= 9 ? "DD3" : index <= 14 ? "DDR4" : "DDR3",
        ramSize: index <= 9 ? "8 GB" : index <= 14 ? "16 GB" : "8Gb",
        ramSlots: index <= 9 ? "2" : index <= 14 ? "2" : "1",
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("DetailAssets", null, {});
  },
};
