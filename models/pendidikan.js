"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pendidikan extends Model {
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
  Pendidikan.init(
    {
      biodata_id: DataTypes.INTEGER,
      jenjang: DataTypes.STRING,
      institusi: DataTypes.STRING,
      jurusan: DataTypes.STRING,
      tahun_lulus: DataTypes.INTEGER,
      ipk: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pendidikan",
    }
  );
  return Pendidikan;
};
