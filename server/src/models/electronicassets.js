"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ElectronicAssets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ElectronicAssets.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
      });
      ElectronicAssets.belongsTo(models.Users, {
        foreignKey: "previousUserId",
        as: "user",
      });
    }
  }
  ElectronicAssets.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      brand: DataTypes.STRING,
      serialNumber: DataTypes.STRING,
      condition: DataTypes.STRING,
      purchaseDate: DataTypes.DATE,
      userId: DataTypes.INTEGER,
      previousUserId: DataTypes.INTEGER,
      notes: DataTypes.STRING,
      lastDateOfRepair: DataTypes.DATE,
      image: DataTypes.STRING,
      reasonToRemoveAssets: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      createdBy: DataTypes.INTEGER,
      updatedBy: DataTypes.INTEGER,
      deletedBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ElectronicAssets",
    }
  );
  return ElectronicAssets;
};
