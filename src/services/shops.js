import { each } from "../utils/iter";
import { ResourceCRUDService } from "./resouceCRUD";

export class ShopService extends ResourceCRUDService {
  constructor(app) {
    super(app, 'Shop', 'shop');
  }

  /**
   * function to get all
   *
   * @param where
   * @returns {Promise<Model[]>}
   */
  async getAll(where = {}, { order }) {
    // where object 를 통해 검색 조건을 만드는 방법은 아래 링크를 참고해주세요.
    // https://sequelize.org/master/manual/eager-loading.html#complex-where-clauses-at-the-top-level

    const shops = await this.Shop.findAll({
      where,
      include: [
        {
          model: this.db.PixelCode,
          attributes: ['id', 'code', 'brandId', 'shopId'],
          required: false,
          include: {
            model: this.db.Brand,
            attributes: ['id', 'name']
          },
        },
      ],
      order: [
        order
      ],
    });

    return shops;
  }


  /**
   * function to get one
   *
   * @param id
   * @param query
   * @returns {Promise<*>}
   */
  async getOne({ id, ...query }) {
    this.__error(() => !id, 400, "id is needed");

    const brand = await this.__getResource(id, query);

    return brand;
  }

  /**
   * function to create one
   *
   * @param { {shop: object} } { shop }
   * @returns {Promise<number>} created id
   * @memberof ShopService
   */
  async create({ resourceData }) {
    this.__error(() => !resourceData, 400, `${this.resourceVar} is needed`);

    const shop = await this.Shop.create(resourceData);
    await this.__bulkUpsertAssociatedPixelCodes(shop, resourceData.PixelCodes);

    return await this.__getResource(shop.id);
  }

  /**
   * function to update one
   *
   * @param { { id: number, shop: object } } { id, shop = {} }
   * @returns {Promise<{ id: number }>} updated
   * @memberof ShopService
   */
  async update({ id, resourceData = {} }) {
    let shop = await this.__getResource(id);

    await this.__bulkUpsertAssociatedPixelCodes(shop, resourceData.PixelCodes);
    await this.__bulkDestroyAssociatedPixelCodes(shop, resourceData.PixelCodes);

    shop = await shop.update(resourceData);

    return await this.__getResource(shop.id);
  }

  // /**
  //  * function to destroy one
  //  *
  //  * @param { { id: number } } { id }
  //  * @returns {Promise<object>} destroyed
  //  * @memberof ShopService
  //  */
  async destroy({ id }) {
    const shopBefore = await this.__getResource(id);

    await this.db.PixelCode.destroy({ where: { id: shopBefore.PixelCodes.map(rec => rec.id) } });
    return await shopBefore.destroy();
  }

  /**********************
   * PRIVATE
   **********************/

  async __getResource(id, query = {}) {
    const checkDataIsEmpty = (data) => data instanceof Array ? data.length : data;
    const shop = await this.Shop.findOne({
      where: { id, ...query },
      include: [{
        model: this.db.PixelCode,
        attributes: ['id', 'code', 'brandId', 'shopId'],
        required: false,
        include: {
          model: this.db.Brand,
          attributes: ['id', 'name']
        },
      }]
    });

    this.__error(
      () => !checkDataIsEmpty(shop),
      412,
      `can't get the ${this.resourceVar} ${id}`
    );

    return shop;
  }

  async __bulkUpsertAssociatedPixelCodes(shop, pixelCodeDataList) {
    const findPixelCodeOfShop = (id) => (shop.PixelCodes || []).filter((record) => record.id === id)[0];
    const compareDataValueIsSame = (origin, target) => JSON.stringify(origin) === JSON.stringify({ ...origin, ...target });
    const upsertPixelCode = async (pixelCodeData) => {
      const pixelCode = findPixelCodeOfShop(pixelCodeData.id);
      if (pixelCode) {
        if (!compareDataValueIsSame(pixelCode.dataValues, pixelCodeData)) {
          await pixelCode.update(pixelCodeData);
        }
      } else {
        await this.db.PixelCode.create({
          ...pixelCodeData,
          shopId: shop.id,
        });
      }
    };

    for (const pixelCodeData of pixelCodeDataList) {
      await upsertPixelCode(pixelCodeData);
    }
  }

  async __bulkDestroyAssociatedPixelCodes(shop, pixelCodeDataList) {
    const pixelCodeListToDestroy = shop.PixelCodes.filter(pixelCodeRecord => !pixelCodeDataList.filter(pixelCodeData => pixelCodeData.id === pixelCodeRecord.id)[0])
    const pixelCodeIdListToDestroy = pixelCodeListToDestroy.map(record => record.id);

    return this.db.PixelCode.destroy({
      where: { id: pixelCodeIdListToDestroy }
    });
  }
}