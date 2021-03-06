"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("ProductPages", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        title: {
          type: Sequelize.STRING,
        },
        uniqueNumber: {
          type: Sequelize.INTEGER,
        },
        sourceUrl: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() => {
        queryInterface.addColumn("ProductPages", "BrandId", {
          type: Sequelize.INTEGER,
          references: { model: "Brands", key: "id" },
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("ProductPages");
  },
};
