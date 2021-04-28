'use strict';

const faker = require('faker');
const { fetchData, map, now } = require('./utils');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * PixelCode 테이블에 shopId 컬럼을 추가합니다.
     */
    await queryInterface.addColumn('PixelCodes', 'shopId', {
      type: Sequelize.INTEGER,
      references: { model: 'Shops', key: 'id' }
    });

    /**
     * [데이터 마이그레이션]
     * 기존 shopName 컬럼을 바탕으로 shop 데이터를 생성한뒤, shopId 컬럼에 shop.id 를 집어넣어 줍니다.
     */
    await dataMigration(queryInterface);

    /**
     * PixelCode 테이블에 shopName 컬럼을 삭제합니다.
     */
    await queryInterface.removeColumn('PixelCodes', 'shopName');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * PixelCode 테이블에 shopName 컬럼을 추가합니다.
     */
    await queryInterface.addColumn('PixelCodes', 'shopName', {
      type: Sequelize.STRING
    });

    /**
     * [데이터 마이그레이션]
     * 기존 shopId 컬럼을 바탕으로 shop 데이터를 불러온뒤, shopName 컬럼에 shop.name 을 집어넣어 줍니다.
     */
    const updateShopNameOfPixelCode = (pixelCode, shop) => queryInterface.sequelize.query(`UPDATE PixelCodes SET shopName = ${shop.name} WHERE id = ${pixelCode.id}`);
    const shops = await fetchData(`SELECT * FROM Shops`, queryInterface);
    const pixelCodes = await fetchData(`SELECT * FROM PixelCodes`, queryInterface);
    const promises = map((pixelCode) => {
      const shop = shops.filter(shop => shop.id === pixelCode.shopId)[0];
      return updateShopNameOfPixelCode(pixelCode, shop);
    }, pixelCodes);
    await Promise.all(promises).catch(console.log);

    /**
     * PixelCode 테이블에 shopId 컬럼을 삭제합니다.
     */
    return queryInterface.removeColumn('PixelCodes', 'shopId');
  }
};


async function dataMigration(queryInterface) {
  const createdAt = now();
  const updatedAt = now();

  /**
   * Shop 모델의 레코드 생성하기.
   */

    // 기존 PixelCode 테이블에 더미로 입력되어 있는 shopName 들을 가져옵니다.
  let shopNames = await queryInterface.sequelize.query('SELECT shopName FROM PixelCodes GROUP BY shopName;');
  shopNames = map((shopNameObject) => shopNameObject.shopName, shopNames[0]);

  // 기존에 존재하는 shopName 들을 기반으로 Shop 모델의 레코드 형태로 변환합니다.
  let shops = map(shopName => {
    shopName = shopName || 'gomistore-th'; // shopName 이 NULL 인 경우, gomistore-th 을 기본값으로 취급하여 집어넣습니다.
    return {
      name: shopName,
      domain: shopName === 'haravan' ? 'https://www.gomimall.vn' : faker.internet.url(),
      createdAt,
      updatedAt,
    }
  }, shopNames);

  // 변환된 shop 데이터들을 바탕으로 레코드를 생성하고 생성된 레코드를 받아옵니다.
  await queryInterface.bulkInsert('Shops', shops);
  shops = await fetchData(`SELECT * FROM Shops ORDER BY id DESC;`, queryInterface);


  /**
   * PixelCode 모델에 shopId 집어넣기.
   */

  const updateShopIdOfPixelCode = (pixelCode, shop) => queryInterface.sequelize.query(`UPDATE PixelCodes SET shopId = ${shop.id} WHERE id = ${pixelCode.id}`);
  const pixelCodes = await fetchData(`SELECT * FROM PixelCodes ORDER BY id ASC;`, queryInterface);
  const promises = map((pixelCode) => {
    let shop = shops.filter(shop => shop.name === pixelCode.shopName)[0];

    if (!shop) {
      return fetchData(`SELECT * FROM Shops WHERE name = 'gomistore-th'`, queryInterface)
        .then(shopDatas => shopDatas[0])
        .then(shop => updateShopIdOfPixelCode(pixelCode, shop));
    }
    else {
      return updateShopIdOfPixelCode(pixelCode, shop);
    }
  }, pixelCodes);

  return await Promise.all(promises).catch(console.log);
}
