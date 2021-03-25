"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("PixelCodes", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        code: {
          type: Sequelize.STRING,
        },
        shopName: {
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
        queryInterface.addColumn("PixelCodes", "BrandId", {
          type: Sequelize.INTEGER,
          references: { model: "Brands", key: "id" },
        });
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PixelCodes");
  },
};
