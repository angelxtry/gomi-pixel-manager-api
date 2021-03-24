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

  // get all
  app.get("/", { schema: getAllSchema }, async (request, reply) => {
    app.log.info("request.query", request.query);
    const productPages = await productPageService.getAll({});
    return productPages;
  });

  // get one
  app.get("/:id", { schema: getOneSchema }, async (request, reply) => {
    const {
      params: { id },
    } = request;

    app.log.info("productPageId", id);

    const productPage = await productPageService.getOne({ id });
    return productPage;
  });

  // create
  app.post("/", { schema: createSchema }, async (request, reply) => {
    const { body } = request;

    const created = await productPageService.create({ resourceData: body });

    return created;
  });

  // update
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
