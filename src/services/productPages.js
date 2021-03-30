import { ResourceCRUDService } from "./resouceCRUD";

export class ProductPageService extends ResourceCRUDService {
  constructor(app) {
    super(app, "ProductPage", "productPage");
  }
  // /**
  //  * Creates an instance of ProductPageService.
  //  * @param {object} app fastify app
  //  * @memberof ProductPageService
  //  */
  // constructor(app) {
  //   if (!app.ready) throw new Error(`can't get .ready from fastify app.`);
  //   this.app = app;
  //   this.db = this.app.db;
  //   if (!this.db) throw new Error("cant get db from fastify app.");

  //   this.err = new Error();
  //   this.ProductPage = this.db.ProductPage;
  // }

  /**
   * function to get all
   *
   * @param { filter: object } { filter = {} }
   * @returns {Promise<{ id: number }>[]} array
   * @memberof ProductPageService
   */
  async getAll({ filter = {} }) {
    const productPages = await this.ProductPage.findAll({
      include: this.db.Brand,
    });

    return productPages;
  }

  // /**
  //  * function to get one
  //  *
  //  * @param { { id: number } } { id }
  //  * @returns {Promise<{id: number}>} object
  //  * @memberof ProductPageService
  //  */
  // async getOne({ id }) {
  //   this.__error(() => !id, 400, "id is needed");

  //   const productPage = await this.__getProductPage(id);

  //   return productPage;
  // }

  // /**
  //  * function to create one
  //  *
  //  * @param { {productPage: object} } { productPage }
  //  * @returns {Promise<number>} created id
  //  * @memberof ProductPageService
  //  */
  // async create({ productPage }) {
  //   this.__error(() => !productPage, 400, "productPage is needed");

  //   const createdProductPage = await new this.ProductPage.create(productPage);

  //   return createdProductPage;
  // }

  // /**
  //  * function to update one
  //  *
  //  * @param { { id: number, productPage: object } } { id, productPage = {} }
  //  * @returns {Promise<{ id: number }>} updated
  //  * @memberof ProductPageService
  //  */
  // async update({ id, productPage = {} }) {
  //   const productPageBefore = await this.__getProductPage(id);

  //   if (isEmptyObject(productPage)) {
  //     return productPageBefore;
  //   }

  //   const updatedProductPage = await productPageBefore.update(productPage);

  //   return updatedProductPage;
  // }

  // /**
  //  * function to destroy one
  //  *
  //  * @param { { id: number } } { id }
  //  * @returns {Promise<object>} destroyed
  //  * @memberof ProductPageService
  //  */
  // async destroy({ id }) {
  //   const productPageBefore = await this.__getProductPage(id);

  //   return await productPageBefore.destroy();
  // }

  /**********************
   * PRIVATE
   **********************/

  async __getResource(id) {
    const checkDataIsEmpty = (data) =>
      data instanceof Array ? data.length : data;
    const productPage = await this.ProductPage.findOne({
      where: { id },
      include: this.db.Brand,
    });

    this.__error(
      () => !checkDataIsEmpty(productPage),
      412,
      `can't get the ${this.resourceVar} ${id}`
    );

    return productPage;
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
