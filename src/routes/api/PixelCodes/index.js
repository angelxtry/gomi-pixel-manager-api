import { PixelCodeService } from "../../../services/pixelCodes";
import {
  createSchema,
  getAllSchema,
  getOneSchema,
  updateSchema,
  destroySchema,
} from "./schemas";

export default async function pixelCodeRouter(app, options) {
  const pixelCodeService = new PixelCodeService(app);

  // get all
  app.get("/", { schema: getAllSchema }, async (request, reply) => {
    app.log.info("request.query", request.query);
    const pixelCodes = await pixelCodeService.getAll({});
    return pixelCodes;
  });

  // get one
  app.get("/:id", { schema: getOneSchema }, async (request, reply) => {
    const {
      params: { id },
    } = request;

    app.log.info("pixelCodeId", id);

    const pixelCode = await pixelCodeService.getOne({ id });
    return pixelCode;
  });

  // create
  app.post("/", { schema: createSchema }, async (request, reply) => {
    const { body } = request;

    const created = await pixelCodeService.create({ resourceData: body });

    return created;
  });

  // update
  app.patch("/:id", { schema: updateSchema }, async (request, reply) => {
    const {
      params: { id },
      body,
    } = request;

    app.log.info("pixelCodeId", id);
    app.log.info("body", body);

    const updated = await pixelCodeService.update({ id, resourceData: body });

    return updated;
  });

  // destroy
  app.delete("/:id", { schema: destroySchema }, async (request, reply) => {
    const {
      params: { id },
    } = request;

    app.log.info("pixelCodeId", id);

    const deleted = await pixelCodeService.destroy({ id });
    return deleted;
  });
}
