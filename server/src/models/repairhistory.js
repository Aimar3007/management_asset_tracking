"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RepairHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RepairHistory.belongsTo(models.ElectronicAssets, {
        foreignKey: "assetsId",
        as: "ElectronicAssets",
      });
    }
  }
  RepairHistory.init(
    {
      assetsId: DataTypes.INTEGER,
      dateOfRepair: DataTypes.DATE,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RepairHistory",
    }
  );
  return RepairHistory;
};
