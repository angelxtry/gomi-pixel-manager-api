const dotenv = require('dotenv')
const path = require('path')

// validate the NODE_ENV
// 현재 실행 환경이 무엇인지 정의합니다.
const NODE_ENV = process.env.NODE_ENV || 'development';

// 실행 환경에 맞는 환경변수 파일을 지정합니다.
const envPathFinder = {
  development: '../.env',
  production: '../.env.production',
};

// 지정한 파일에 따라 경로객체를 구성합니다.
const envPath = path.resolve(__dirname, envPathFinder[NODE_ENV]);

// 환경변수 파일의 키-값을 process.env 객체의 환경변수에 등록합니다.
dotenv.config({ path: envPath });

// 앱에서 사용하게 될 환경만 사용하기 좋게 따로 모아 내보냅니다.
const environment = {
  /* GENERAL */
  NODE_ENV,
  TIME_ZONE: process.env.TIME_ZONE,
  PORT: process.env.PORT || 8080,
  HOST: process.env.HOST || '127.0.0.1',

  /* DATABASE INFORMATION */
  DB_NOSQL_HOST: process.env.DB_NOSQL_HOST,
  DB_NOSQL_USER: process.env.DB_NOSQL_USER,
  DB_NOSQL_PASSWORD: process.env.DB_NOSQL_PASSWORD,
  DB_NOSQL_NAME: process.env.DB_NOSQL_NAME,
  DB_NOSQL_PORT: process.env.DB_NOSQL_PORT,

  DATABASE_SERVICE: process.env.DATABASE_SERVICE,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_DBNAME: process.env.DATABASE_DBNAME,
};

console.log({ envPath, ...environment })

module.exports = environment;
