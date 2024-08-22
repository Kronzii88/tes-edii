"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Pendidikans", {
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
      jenjang: {
        type: Sequelize.STRING,
      },
      institusi: {
        type: Sequelize.STRING,
      },
      jurusan: {
        type: Sequelize.STRING,
      },
      tahun_lulus: {
        type: Sequelize.INTEGER,
      },
      ipk: {
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
    await queryInterface.dropTable("Pendidikans");
  },
};
