import { ProductPageService } from "../../../services/productPages";
import {
  createSchema,
  getAllSchema,
  getOneSchema,
  updateSchema,
  destroySchema,
} from "./schemas";
import queryParser from "../../utils/queryParser";

export default async function productPageRouter(app, options) {
  const productPageService = new ProductPageService(app);

  /**
   * get all
   * 
   * === Basic Response
   * Array of ProductPage Object (include 'Brand')
      [
          {
              "id": 1,
              "brandId": 1,
              "Brand": {
                  "id": 1,
                  "name": "Bergnaum, O'Kon and Schaefer"
              },
              "title": "Practical Fresh Pants",
              "uniqueNumber": "92855",
              "sourceUrl": "http://dangelo.org/Practical-Fresh-Pants",
              "createdAt": "2021-03-25T14:22:53.000Z",
              "updatedAt": "2021-03-25T14:22:53.000Z"
          },
          {
              "id": 2,
              "brandId": 1,
              "Brand": {
                  "id": 1,
                  "name": "Bergnaum, O'Kon and Schaefer"
              },
              "title": "Small Metal Hat",
              "uniqueNumber": "85126",
              "sourceUrl": "http://dangelo.org/Small-Metal-Hat",
              "createdAt": "2021-03-25T14:22:53.000Z",
              "updatedAt": "2021-03-25T14:22:53.000Z"
          },
          ...
      ]
   */
  app.get("/", async (request, reply) => {
    const complexQuery = queryParser.parse(request.query);
    const { sort, ...query } = complexQuery;

    return productPageService.getAll(query, {
      order: sort ? JSON.parse(sort) : ['id', 'ASC']
    });
  });

  /**
   * get one
   * 
   * ===
   * One Brand Object (include 'Brand')
      {
          "id": 1,
          "brandId": 1,
          "Brand": {
              "id": 1,
              "name": "Bergnaum, O'Kon and Schaefer"
          },
          "title": "Practical Fresh Pants",
          "uniqueNumber": "92855",
          "sourceUrl": "http://dangelo.org/Practical-Fresh-Pants",
          "createdAt": "2021-03-25T14:22:53.000Z",
          "updatedAt": "2021-03-25T14:22:53.000Z"
      }
   */
  app.get("/:id", { schema: getOneSchema }, async (request, reply) => {
    const { params: { id } } = request;
    const query = queryParser.parse(request.query);

    return productPageService.getOne({ id, ...query });
  });

  // create
  // => Created ProductPage Object (include 'Brand')
  app.post("/", { schema: createSchema }, async (request, reply) => {
    const { body } = request;

    return productPageService.create({ resourceData: body });
  });

  // update
  // => Updated ProductPage Object (include 'Brand')
  app.patch("/:id", { schema: updateSchema }, async (request, reply) => {
    const { params: { id }, body } = request;

    return productPageService.update({ id, resourceData: body });
  });

  // destroy
  app.delete("/:id", { schema: destroySchema }, async (request, reply) => {
    const { params: { id } } = request;

    return productPageService.destroy({ id });
  });
}
