import queryParser from "../../utils/queryParser";
import { ShopService } from "../../../services/shops";

export default async function shopRouter(app, options) {
  const shopService = new ShopService(app);

  /**
   * get all
   * 
   * === Basic Response
   * Array of Shop Object
      [
        {
          "id": 1,
          "name": "haravan",
          "domain": "https://www.gomimall.vn",
          "createdAt": "2021-03-25T14:22:53.000Z",
          "updatedAt": "2021-03-26T02:56:19.000Z",
          "PixelCodes": [
            {
                "id": 1,
                "code": "40293783694",
                "brandId": 1,
                "shopId": 67
            },
            {
                "id": 3,
                "code": "25060720881",
                "brandId": 2,
                "shopId": 67
            },
            ...
          ]
        },
        ...
      ]
   */
  app.get("/", async (request, reply) => {
    const complexQuery = queryParser.parse(request.query);
    const { sort, ...query } = complexQuery;

    return shopService.getAll(query, {
      order: sort ? JSON.parse(sort) : ['id', 'ASC']
    });
  });

  /**
   * get one
   * 
   * ===
   * One Shop Object
      {
          "id": 1,
          "name": "haravan",
          "domain": "https://gomimall.vn",
          "createdAt": "2021-04-28T04:23:50.000Z",
          "updatedAt": "2021-04-28T04:23:50.000Z",
          "PixelCodes": [
              {
                  "id": 2,
                  "code": "54355276329",
                  "brandId": 1,
                  "shopId": 1
              }
          ]
      }
   */
  app.get("/:id", async (request, reply) => {
    const { params: { id } } = request;
    const query = queryParser.parse(request.query);

    return shopService.getOne({ id, ...query });
  });

  // create
  // => Created Shop Object
  app.post("/", async (request, reply) => {
    const { body } = request;

    return shopService.create({ resourceData: body });
  });

  // update
  // => Updated Shop Object
  app.patch("/:id", async (request, reply) => {
    const { params: { id }, body } = request;

    return shopService.update({ id, resourceData: body });
  });

  // destroy
  // => Destroyed Shop Object
  app.delete("/:id", async (request, reply) => {
    const { params: { id } } = request;

    return shopService.destroy({ id });
  });
}
