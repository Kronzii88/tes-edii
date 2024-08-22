"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pelatihans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      biodata_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Biodata",
          },
          key: "id",
        },
      },
      nama: {
        type: Sequelize.STRING,
      },
      sertifikat: {
        type: Sequelize.BOOLEAN,
      },
      tahun: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Pelatihans");
  },
};
