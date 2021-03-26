import path from "path";

import Fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifyUrlData from "fastify-url-data";
import fastifyExpress from "fastify-express";
import fastifyStatic from "fastify-static";

import cors from "./plugins/cors";

import db from "./db";

// order to register / load
// 1. plugins (from the Fastify ecosystem)
// 2. your plugins (your custom plugins)
// 3. decorators
// 4. hooks
// 5. middlewares
// 6. your services

// implement inversion of control to make the code testable
export async function build() {
  console.log("\n--- Booting web server...", process.NODE_ENV || "development");

  const fastify = Fastify({
    bodyLimit: 1048576 * 2,
    logger: { prettyPrint: true },
  });

  /**
   * 1. plugins
   */
  // await require('./plugins/mongo-db-connector')(fastify);
  fastify.register(fastifyUrlData);
  fastify.register(fastifyExpress);
  fastify.register(fastifyStatic, {
    root: path.resolve(__dirname, "../public"),
    prefix: "/",
  });

  await fastify.register(db, {});
  await fastify.register(require("./routes"), {});

  /**
   * 4. hooks
   */
  fastify.addHook("onClose", (instance, done) => {
    const { db } = instance;
    db.sequelize.close().then(() => instance.log.info("knex pool destroyed."));
  });

  /**
   * 5. middlewares
   * See more : https://www.fastify.io/docs/latest/Middleware/
   */
  fastify.register(fastifyCors, cors);
  // fastify.use(require('dns-prefetch-control')())
  // fastify.use(require('frameguard')())
  // fastify.use(require('hsts')())
  // fastify.use(require('ienoopen')())
  // fastify.use(require('x-xss-protection')())

  return fastify;
}
