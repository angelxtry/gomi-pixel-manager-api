const {
  DATABASE_SERVICE,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_DBNAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = require("../../environment");

const common = {
  autoConnect: true, // auto authentication and test connection on first run

  define: {
    charset: "utf8mb4",
    dialectOptions: {
      collate: "utf8mb4_unicode_ci",
    },
  },

  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
};

// [FIXME]
// 여기 나온 방식으로 환경관리하는 것과 https://dev.to/cristiandi/demo-api-using-fastify-48jo
// Sequelize Cli 에서 제공되는 환경관리 방식에 차이가 있어
// 현재는 이건 뭐 너무 못생겨져 버렸습니다;;
// 반드시 고쳐야 합니다.ㄷㄷ
// sequelize 쪽으로든, fastify 쪽으로든.
// 단, 다른 개발자들이 sequelize-cli 를 여전히 공식문서를 보고 잘 활용할 수 있어야 합니다.
// 별도의 지식을 쌓아 러닝커브를 높이는 것은 가급적 지양합시다.
module.exports = {
  development: {
    dialect: DATABASE_SERVICE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    database: DATABASE_DBNAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,

    ...common,
  },
  test: {
    dialect: DATABASE_SERVICE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    database: DATABASE_DBNAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,

    ...common,
  },
  production: {
    dialect: DATABASE_SERVICE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    database: DATABASE_DBNAME,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,

    ...common,
  },
}[process.NODE_ENV || "development"];
