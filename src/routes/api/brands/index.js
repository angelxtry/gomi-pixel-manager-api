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

  // get all
  app.get("/", { schema: getAllSchema }, async (request, reply) => {
    app.log.info("request.query", request.query);
    const brands = await brandService.getAll({});
    return brands;
  });

  // get one
  app.get("/:id", { schema: getOneSchema }, async (request, reply) => {
    const {
      params: { id },
    } = request;

    app.log.info("brandId", id);

    const brand = await brandService.getOne({ id });
    return brand;
  });

  // create
  app.post("/", { schema: createSchema }, async (request, reply) => {
    const { body } = request;

    const created = await brandService.create({ resourceData: body });

    return created;
  });

  // update
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
  app.delete("/:id", { schema: destroySchema }, async (request, reply) => {
    const {
      params: { id },
    } = request;

    app.log.info("brandId", id);

    const deleted = await brandService.destroy({ id });
    return deleted;
  });
}
