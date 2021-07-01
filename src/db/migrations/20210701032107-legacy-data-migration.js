'use strict';

const legacyDB = require('./utils/legacyDatabase-v0-0-39.json');

const {
  each, map, filter,
  createRecord, deleteRecord
} = require('./utils');

const shopName = 'GomiMall-VN(Haravan)';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    try {

      // 샵 생성
      const shop = await createShop(queryInterface, {
        name: shopName,
        domain: 'https://www.gomimall.vn'
      });
      console.log(shop);
      // 샵 픽셀코드 생성(슈퍼픽셀 추가) - 이건 수동으로 할 것. 슈퍼픽셀 코드가 소스코드 상에 들어가는 것이 좋지 않으므로.
      // await createPixel(queryInterface, { name: `${shopName} Super Pixel`, code: 'xxxxxxxxxxx', shopId: shop.id, });


      // 브랜드 생성
      const brandList = [];
      await each(async ({ id, name, pixel_id: pixelIdList }) => {
        const brand = await createBrand(queryInterface, { name });
        brand.originalId = id;

        // 브랜드 픽셀코드 생성(샵 연결)
        await each(async ({ id: code }) => await createPixel(queryInterface, {
          name: `${brand.name} 브랜드 픽셀`,
          code,
          brandId: brand.id,
          shopId: shop.id,
        }), pixelIdList);

        // 상품페이지 생성(브랜드 연결)
        const childProductPageList = filter(({ brand_id: originalId }) => brand.originalId === originalId, legacyDB.pages);
        await each(async ({ title, uniq_val: uniqueNumber, url: sourceUrl }) => createProductPage(queryInterface, {
          title,
          uniqueNumber,
          sourceUrl,
          brandId: brand.id
        }), childProductPageList);

      }, legacyDB.brands);

    } catch (err) {
      _baseError(err)
    }

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    // 상품페이지 삭제한다.
    await each(async ({ uniq_val: uniqueNumber }) => deleteProductPageByUniqueNumber(queryInterface, { uniqueNumber }), legacyDB.pages);

    // 브랜드를 돌면서
    await each(async ({ name, pixel_id: pixelIdList }) => {
      // 브랜드 픽셀을 삭제한다.
      await each(async ({ id: code }) => deletePixel(queryInterface, { code }), pixelIdList);

      // 브랜드를 삭제한다.
      await deleteBrandByName(queryInterface, { name });
    }, legacyDB.brands);

    // 샵의 슈퍼픽셀을 삭제한다. (슈퍼픽셀은 손으로 직접 삭제해야 한다.)
    // 샵을 삭제한다. (슈퍼픽셀은 손으로 직접 삭제해야 하기 때문에, 참조관게인 샵도 수동으로 삭제해야 한다.)
    // return await deleteShopByName(queryInterface, { name: shopName });
  }
};

async function createShop(queryInterface, data) {
  return createRecord(queryInterface, 'Shops', data);
}

async function deleteShopByName(queryInterface, { name }) {
  return deleteRecord(queryInterface, 'Shops', null, `WHERE name = "${name}"`);
}

async function createBrand(queryInterface, data) {
  return createRecord(queryInterface, 'Brands', data);
}

async function deleteBrandByName(queryInterface, { name }) {
  return deleteRecord(queryInterface, 'Brands', null, `WHERE name = "${name}"`);
}

async function createPixel(queryInterface, data) {
  return createRecord(queryInterface, 'PixelCodes', data);
}

async function deletePixel(queryInterface, { code }) {
  return deleteRecord(queryInterface, 'PixelCodes', null, `WHERE code = "${code}"`)
}

async function createProductPage(queryInterface, data) {
  return createRecord(queryInterface, 'ProductPages', data);
}

async function deleteProductPageByUniqueNumber(queryInterface, { uniqueNumber }) {
  return deleteRecord(queryInterface, 'ProductPages', null, `WHERE uniqueNumber = "${uniqueNumber}"`)
}

function _baseError(err) {
  console.warn(err);
}
