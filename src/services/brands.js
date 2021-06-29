import { each } from "../utils/iter";
import { ResourceCRUDService } from "./resouceCRUD";

export class BrandService extends ResourceCRUDService {
  constructor(app) {
    super(app, "Brand", "brand");
  }

  // /**
  //  * Creates an instance of BrandService.
  //  * @param {object} app fastify app
  //  * @memberof BrandService
  //  */
  // constructor(app) {
  //   if (!app.ready) throw new Error(`can't get .ready from fastify app.`);
  //   this.app = app;
  //   this.db = this.app.db;
  //   if (!this.db) throw new Error("cant get db from fastify app.");
  //
  //   this.err = new Error();
  //   this.Brand = this.db.Brand;
  // }

  /**
   * function to get all
   *
   * @param where
   * @returns {Promise<Model[]>}
   */
  async getAll(where = {}, { order }) {
    const brands = await this.Brand.findAll({
      where,
      include: [
        { model: this.db.PixelCode },
      ],
      order: [
        order
      ],
    });

    return brands;
  }

  // /**
  //  * function to get one
  //  *
  //  * @param { { id: number } } { id }
  //  * @returns {Promise<{id: number}>} object
  //  * @memberof BrandService
  //  */
  // async getOne({ id }) {
  //   this.__error(() => !id, 400, "id is needed");

  //   const brand = await this.__getBrand(id);

  //   return brand;
  // }

  /**
   * function to create one
   *
   * @param { {brand: object} } { brand }
   * @returns {Promise<number>} created id
   * @memberof BrandService
   */
  async create({ resourceData }) {
    this.__error(() => !resourceData, 400, `${this.resourceVar} is needed`);

    const brand = await this.Brand.create(resourceData);
    await this.__bulkUpsertAssociatedPixelCodes(brand, resourceData.PixelCodes);

    return await this.__getResource(brand.id);
  }

  /**
   * function to update one
   *
   * @param { { id: number, brand: object } } { id, brand = {} }
   * @returns {Promise<{ id: number }>} updated
   * @memberof BrandService
   */
  async update({ id, resourceData = {} }) {
    let brand = await this.__getResource(id);

    await this.__bulkUpsertAssociatedPixelCodes(brand, resourceData.PixelCodes);
    await this.__bulkDestroyAssociatedPixelCodes(brand, resourceData.PixelCodes);

    brand = await brand.update(resourceData);

    return await this.__getResource(brand.id);
  }

  // /**
  //  * function to destroy one
  //  *
  //  * @param { { id: number } } { id }
  //  * @returns {Promise<object>} destroyed
  //  * @memberof BrandService
  //  */
  async destroy({ id }) {
    const brandBefore = await this.__getResource(id);

    await this.db.PixelCode.destroy({ where: { id: brandBefore.PixelCodes.map(rec => rec.id) } });
    return await brandBefore.destroy();
  }

  /**********************
   * PRIVATE
   **********************/

  async __getResource(id, query = {}) {
    const checkDataIsEmpty = (data) => data instanceof Array ? data.length : data;
    const brand = await this.Brand.findOne({
      where: { id, ...query },
      include: this.db.PixelCode,
    });

    this.__error(
      () => !checkDataIsEmpty(brand),
      412,
      `can't get the ${this.resourceVar} ${id}`
    );

    return brand;
  }

  async __bulkUpsertAssociatedPixelCodes(brand, pixelCodeDataList) {
    const findPixelCodeOfBrand = (id) => (brand.PixelCodes || []).filter((record) => record.id === id)[0];
    const compareDataValueIsSame = (origin, target) => JSON.stringify(origin) === JSON.stringify({ ...origin, ...target });
    const upsertPixelCode = async (pixelCodeData) => {
      const pixelCode = findPixelCodeOfBrand(pixelCodeData.id);
      if (pixelCode) {
        if (!compareDataValueIsSame(pixelCode.dataValues, pixelCodeData)) {
          await pixelCode.update(pixelCodeData);
        }
      } else {
        await this.db.PixelCode.create({
          ...pixelCodeData,
          brandId: brand.id,
        });
      }
    };

    for (const pixelCodeData of pixelCodeDataList) {
      await upsertPixelCode(pixelCodeData);
    }
  }

  async __bulkDestroyAssociatedPixelCodes(brand, pixelCodeDataList) {
    const pixelCodeListToDestroy = brand.PixelCodes.filter(pixelCodeRecord => !pixelCodeDataList.filter(pixelCodeData => pixelCodeData.id === pixelCodeRecord.id)[0])
    const pixelCodeIdListToDestroy = pixelCodeListToDestroy.map(record => record.id);

    return this.db.PixelCode.destroy({
      where: { id: pixelCodeIdListToDestroy }
    });
  }

  // /**
  //  * Throw error to response error.
  //  *
  //  * @param {*} condition
  //  * @param {*} code
  //  * @param {*} msg
  //  */
  // __error(condition, code, msg) {
  //   if (condition()) {
  //     this.err.statusCode = code;
  //     this.err.message = msg;
  //     throw this.err;
  //   }
  // }
}
