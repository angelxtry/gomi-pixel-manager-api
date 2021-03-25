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
   * @param { filter: object } { filter = {} }
   * @returns {Promise<{ id: number }>[]} array
   * @memberof BrandService
   */
  async getAll({ filter = {} }) {
    const brands = await this.Brand.findAll({ include: this.db.PixelCode });

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

  // /**
  //  * function to create one
  //  *
  //  * @param { {brand: object} } { brand }
  //  * @returns {Promise<number>} created id
  //  * @memberof BrandService
  //  */
  // async create({ brand }) {
  // }

  // /**
  //  * function to update one
  //  *
  //  * @param { { id: number, brand: object } } { id, brand = {} }
  //  * @returns {Promise<{ id: number }>} updated
  //  * @memberof BrandService
  //  */
  // async update({ id, brand = {} }) {
  //   const brandBefore = await this.__getBrand(id);

  //   const updatedBrand = await brandBefore.update(brand);

  //   return updatedBrand;
  // }

  // /**
  //  * function to destroy one
  //  *
  //  * @param { { id: number } } { id }
  //  * @returns {Promise<object>} destroyed
  //  * @memberof BrandService
  //  */
  // async destroy({ id }) {
  //   const brandBefore = await this.__getBrand(id);

  //   return await brandBefore.destroy();
  // }

  /**********************
   * PRIVATE
   **********************/

  async __getResource(id) {
    const checkDataIsEmpty = (data) =>
      data instanceof Array ? data.length : data;
    const brand = await this.Brand.findOne({
      where: { id },
      include: this.db.PixelCode,
    });

    this.__error(
      () => !checkDataIsEmpty(brand),
      412,
      `can't get the ${this.resourceVar} ${id}`
    );

    return brand;
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
