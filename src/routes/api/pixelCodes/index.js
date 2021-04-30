import queryParser from "../../utils/queryParser";
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
    const query = queryParser.parse(request.query);

    return pixelCodeService.getAll(query);
  });

  // get one
  app.get("/:id", { schema: getOneSchema }, async (request, reply) => {
    const { params: { id } } = request;
    const query = queryParser.parse(request.query);

    return pixelCodeService.getOne({ id, ...query });
  });

  // create
  app.post("/", { schema: createSchema }, async (request, reply) => {
    const { body } = request;

    return pixelCodeService.create({ resourceData: body });
  });

  // update
  app.patch("/:id", { schema: updateSchema }, async (request, reply) => {
    const { params: { id }, body } = request;

    return await pixelCodeService.update({ id, resourceData: body });
  });

  // destroy
  app.delete("/:id", { schema: destroySchema }, async (request, reply) => {
    const { params: { id } } = request;

    return pixelCodeService.destroy({ id });
  });
}
