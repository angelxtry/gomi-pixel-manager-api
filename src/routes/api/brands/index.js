import { BrandService } from "../../../services/brands";
import {
  createSchema,
  getAllSchema,
  getOneSchema,
  updateSchema,
  destroySchema,
} from "./schemas";

export default async function brandRouter(app, options) {
  const brandService = new BrandService(app);

  /**
   * get all
   * 
   * === Basic Response
   * Array of Brand Object
      [
        {
          "id": 1,
          "name": "Bergnaum, O'Kon and Schaefer",
          "platformApiId": 1,
          "createdAt": "2021-03-25T14:22:53.000Z",
          "updatedAt": "2021-03-26T02:56:19.000Z",
          "PixelCodes": [
            {
              "id": 1,
              "code": "01024824541",
                "shopName": "haravan2"
              },
              {
                "id": 2,
                "code": "23077574535",
                "shopName": "Bergnaum, O'Kon and Schaefer soho mall"
              },
            ]
          },
          ...
        ]
   */
  app.get("/", { schema: getAllSchema }, async (request, reply) => {
    app.log.info("request.query", request.query);
    const brands = await brandService.getAll({});
    console.log(brands);
    return brands;
  });

  /**
   * get one
   * 
   * ===
   * One Brand Object
      {
          "id": 1,
          "name": "Bergnaum, O'Kon and Schaefer",
          "platformApiId": 1,
          "createdAt": "2021-03-25T14:22:53.000Z",
          "updatedAt": "2021-03-26T02:56:19.000Z",
          "PixelCodes": [
              {
                  "id": 1,
                  "code": "01024824541",
                  "shopName": "haravan2"
              },
              {
                  "id": 2,
                  "code": "23077574535",
                  "shopName": "Bergnaum, O'Kon and Schaefer soho mall"
              },
              {
                  "id": 22,
                  "code": "01024824541",
                  "shopName": null
              }
          ]
      }
   */
  app.get("/:id", { schema: getOneSchema }, async (request, reply) => {
    const {
      params: { id },
    } = request;

    app.log.info("brandId", id);

    const brand = await brandService.getOne({ id });
    return brand;
  });

  // create
  // => Created Brand Object (include 'PixelRecords')
  app.post("/", { schema: createSchema }, async (request, reply) => {
    const { body } = request;

    const created = await brandService.create({ resourceData: body });

    return created;
  });

  // update
  // => Updated Brand Object (include 'PixelRecords')
  app.patch("/:id", { schema: updateSchema }, async (request, reply) => {
    const {
      params: { id },
      body,
    } = request;

    app.log.info("brandId", id);
    app.log.info("body", body);

    const updated = await brandService.update({ id, resourceData: body });

    return updated;
  });

  // destroy
  // => Destroyed Brand Object
  app.delete("/:id", { schema: destroySchema }, async (request, reply) => {
    const {
      params: { id },
    } = request;

    app.log.info("brandId", id);

    const deleted = await brandService.destroy({ id });
    return deleted;
  });
}
