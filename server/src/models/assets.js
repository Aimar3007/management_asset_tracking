"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Assets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Assets.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Assets.belongsTo(models.User, {
        foreignKey: "previousUserId",
        as: "previousUser",
      });
    }
  }
  Assets.init(
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
      modelName: "Assets",
    }
  );
  return Assets;
};
