import { BrandService } from "../../../services/brands";
import {
  createSchema,
  getAllSchema,
  getOneSchema,
  updateSchema,
  destroySchema,
} from "./schemas";
import queryParser from "../../utils/queryParser";

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
    const query = queryParser.parse(request.query);

    return brandService.getAll(query);
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
    const { params: { id } } = request;
    const query = queryParser.parse(request.query);

    return brandService.getOne({ id, ...query });
  });

  // create
  // => Created Brand Object (include 'PixelRecords')
  app.post("/", { schema: createSchema }, async (request, reply) => {
    const { body } = request;

    return brandService.create({ resourceData: body });
  });

  // update
  // => Updated Brand Object (include 'PixelRecords')
  app.patch("/:id", { schema: updateSchema }, async (request, reply) => {
    const { params: { id }, body } = request;

    return brandService.update({ id, resourceData: body });
  });

  // destroy
  // => Destroyed Brand Object
  app.delete("/:id", { schema: destroySchema }, async (request, reply) => {
    const { params: { id } } = request;

    return brandService.destroy({ id });
  });
}
