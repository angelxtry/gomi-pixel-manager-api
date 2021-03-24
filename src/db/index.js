import fp from "fastify-plugin";
import db from "./models";

async function sequelizeConnector(fastify, options = {}) {
  fastify.decorate("db", db);
}

export default fp(sequelizeConnector);
