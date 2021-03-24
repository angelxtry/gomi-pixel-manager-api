import { APP_PORT } from "../../environment";

/**
 * 튜토리얼에 따라 시작하였으나,
 * 현재는 포스트맨으로 문서를 작성하고 있어 아직은 사용되지 않습니다.
 * 추후 문서를 내부에서 적재하는 경우 이 위치에서 시작할 수 있습니다.
 */
export default {
  routePrefix: "/documentation",
  exposeRoute: true,
  swagger: {
    info: {
      title: "fastify demo api",
      description: "docs",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    servers: [
      { url: `http://localhost:${APP_PORT}`, description: "local development" },
      { url: "https://dev.your-site.com", description: "development" },
      { url: "https://sta.your-site.com", description: "staging" },
      { url: "https://pro.your-site.com", description: "production" },
    ],
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
      { name: "brand", description: "Brand related end-points" },
      { name: "product", description: "Product related end-points" },
    ],
  },
};
