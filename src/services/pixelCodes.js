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
  async getAll(where = {}) {
    const pixelCodes = await this.PixelCode.findAll({
      where,
      include: [
        { model: this.db.Brand },
        { model: this.db.Shop },
      ],
    });

    return pixelCodes;
  }

  /**********************
   * PRIVATE
   **********************/

  async __getResource(id, query = {}) {
    const checkDataIsEmpty = (data) => data instanceof Array ? data.length : data;
    const pixelCode = await this.PixelCode.findOne({
      where: { id, ...query },
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
