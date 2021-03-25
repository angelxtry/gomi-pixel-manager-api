import { ResourceCRUDService } from "./resouceCRUD";

export class PixelCodeService extends ResourceCRUDService {
  constructor(app) {
    super(app, "PixelCode", "pixelCode");
  }

  /**
   * function to get all
   *
   * @param { filter: object } { filter = {} }
   * @returns {Promise<{ id: number }>[]} array
   * @memberof ProductPageService
   */
  async getAll({ filter = {} }) {
    const pixelCodes = await this.PixelCode.findAll({
      include: this.db.Brand,
    });

    console.log(pixelCodes);
    return pixelCodes;
  }

  /**********************
   * PRIVATE
   **********************/

  async __getResource(id) {
    const checkDataIsEmpty = (data) =>
      data instanceof Array ? data.length : data;
    const pixelCode = await this.PixelCode.findOne({
      where: { id },
      include: this.db.Brand,
    });

    this.__error(
      () => !checkDataIsEmpty(pixelCode),
      412,
      `can't get the ${this.resourceVar} ${id}`
    );

    return pixelCode;
  }
}
