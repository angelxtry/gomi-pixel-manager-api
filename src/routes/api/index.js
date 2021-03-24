import brandRouter from "./brands";
import productPageRouter from "./productPages";

export default async function apiRoutes(app, options) {
  app.register(brandRouter, { prefix: "brands" });
  app.register(productPageRouter, { prefix: "productPages" });
}
