"use strict";

const faker = require("faker");

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

    await dataMigration(queryInterface, Sequelize);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PixelCodes");
  },
};

async function dataMigration(queryInterface, Sequelize) {
  for (let i = 0; i < 10; i++) {
    await seeding(queryInterface, Sequelize);
  }
}

async function seeding(queryInterface, Sequelize) {
  const dummyBrand = buildDummyBrandData();
  await queryInterface.bulkInsert("Brands", [dummyBrand], {});
  const brands = await queryInterface.sequelize.query(
    `SELECT * FROM Brands ORDER BY id DESC;`
  );
  const brand = brands[0][0];
  console.log(brand);

  const dateTime = now();
  await queryInterface.bulkInsert("PixelCodes", [
    {
      brandId: brand.id,
      code: faker.random.number(100000000000),
      shopName: "haravan",
      createdAt: dateTime,
      updatedAt: dateTime,
    },
    {
      brandId: brand.id,
      code: faker.random.number(100000000000),
      shopName: `${brand.name} soho mall`,
      createdAt: dateTime,
      updatedAt: dateTime,
    },
  ]);

  const siteUrl = faker.internet.url();
  await queryInterface.bulkInsert("ProductPages", [
    buildDummyProductPage(brand.id, siteUrl),
    buildDummyProductPage(brand.id, siteUrl),
    buildDummyProductPage(brand.id, siteUrl),
  ]);
}

function buildDummyBrandData() {
  const dateTime = now();
  return {
    name: faker.company.companyName(),
    platformApiId: null,
    createdAt: dateTime,
    updatedAt: dateTime,
  };
}

function buildDummyProductPage(brandId, siteUrl) {
  const dateTime = now();
  const title = faker.commerce.productName();
  const sourceUrl = [siteUrl, faker.helpers.slugify(title)].join("/");

  return {
    brandId,
    title,
    uniqueNumber: faker.random.number(),
    sourceUrl,
    createdAt: dateTime,
    updatedAt: dateTime,
  };
}

function now() {
  return new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
}
