"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TranscationAssets extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TranscationAssets.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      TranscationAssets.belongsTo(models.User, {
        foreignKey: "manageBy",
        as: "manageByUser",
      });
      TranscationAssets.belongsTo(models.TypeTransactionAsset, {
        foreignKey: "typeTransactionAssetId",
        as: "type",
      });
      TranscationAssets.belongsTo(models.Assets, {
        foreignKey: "assetId",
        as: "asset",
      });
      TranscationAssets.belongsTo(models.StatusTransactionAssets, {
        foreignKey: "statusTransactionAssetId",
        as: "statusTransaction",
      });
    }
  }
  TranscationAssets.init(
    {
      userId: DataTypes.INTEGER,
      assetId: DataTypes.INTEGER,
      statusTransactionAssetId: DataTypes.INTEGER,
      reasonRequest: DataTypes.STRING,
      reasonReject: DataTypes.STRING,
      manageBy: DataTypes.INTEGER,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "TranscationAssets",
    }
  );
  return TranscationAssets;
};
