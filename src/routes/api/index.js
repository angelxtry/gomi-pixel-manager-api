import SDKRouter from "./sdk";

import brandRouter from "./brands";
import pixelCodeRouter from "./pixelCodes";
import productPageRouter from "./productPages";

export default async function apiRoutes(app, options) {
  app.register(SDKRouter, { prefix: "sdk" });
  app.register(brandRouter, { prefix: "brands" });
  app.register(pixelCodeRouter, { prefix: "pixelCodes" });
  app.register(productPageRouter, { prefix: "productPages" });
}
