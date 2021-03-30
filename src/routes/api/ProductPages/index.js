import { ProductPageService } from "../../../services/productPages";
import {
  createSchema,
  getAllSchema,
  getOneSchema,
  updateSchema,
  destroySchema,
} from "./schemas";

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
  app.get("/", { schema: getAllSchema }, async (request, reply) => {
    app.log.info("request.query", request.query);
    const productPages = await productPageService.getAll({});
    return productPages;
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
    const {
      params: { id },
    } = request;

    app.log.info("productPageId", id);

    const productPage = await productPageService.getOne({ id });
    return productPage;
  });

  // create
  // => Created ProductPage Object (include 'Brand')
  app.post("/", { schema: createSchema }, async (request, reply) => {
    const { body } = request;

    const created = await productPageService.create({ resourceData: body });

    return created;
  });

  // update
  // => Updated ProductPage Object (include 'Brand')
  app.patch("/:id", { schema: updateSchema }, async (request, reply) => {
    const {
      params: { id },
      body,
    } = request;

    app.log.info("productPageId", id);
    app.log.info("body", body);

    const updated = await productPageService.update({ id, resourceData: body });

    return updated;
  });

  // destroy
  app.delete("/:id", { schema: destroySchema }, async (request, reply) => {
    const {
      params: { id },
    } = request;

    app.log.info("productPageId", id);

    const deleted = await productPageService.destroy({ id });
    return deleted;
  });
}
