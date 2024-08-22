"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pekerjaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Biodata, {
        foreignKey: "biodata_id",
        as: "bio",
      });
    }
  }
  Pekerjaan.init(
    {
      biodata_id: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      posisi: DataTypes.STRING,
      pendapatan: DataTypes.INTEGER,
      tahun: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pekerjaan",
    }
  );
  return Pekerjaan;
};
