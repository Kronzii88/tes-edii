"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Biodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });

      this.hasMany(models.Pekerjaan, {
        foreignKey: "biodata_id",
      });

      this.hasMany(models.Pelatihan, {
        foreignKey: "biodata_id",
      });

      this.hasMany(models.Pendidikan, {
        foreignKey: "biodata_id",
      });
    }
  }
  Biodata.init(
    {
      user_id: DataTypes.INTEGER,
      posisi: DataTypes.STRING,
      nama: DataTypes.STRING,
      ktp: DataTypes.STRING,
      alamat: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Biodata",
    }
  );
  return Biodata;
};
