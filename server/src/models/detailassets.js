"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailAssets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DetailAssets.belongsTo(models.ElectronicAssets, {
        foreignKey: "electronicAssetsId",
        as: "ElectronicAssets",
      });
    }
  }
  DetailAssets.init(
    {
      electronicAssetsId: DataTypes.INTEGER,
      storageType: DataTypes.INTEGER,
      storageSize: DataTypes.INTEGER,
      storageConfiguration: DataTypes.INTEGER,
      ramType: DataTypes.INTEGER,
      ramSize: DataTypes.INTEGER,
      ramConfiguration: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DetailAssets",
    }
  );
  return DetailAssets;
};
