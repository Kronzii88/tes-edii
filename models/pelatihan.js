"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pelatihan extends Model {
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
  Pelatihan.init(
    {
      biodata_id: DataTypes.INTEGER,
      nama: DataTypes.STRING,
      sertifikat: DataTypes.BOOLEAN,
      tahun: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pelatihan",
    }
  );
  return Pelatihan;
};
