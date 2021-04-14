const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '../.env') })

let envPath;

// validate the NODE_ENV
const NODE_ENV = process.env.NODE_ENV || 'development';

console.log(NODE_ENV)
switch (NODE_ENV) {
case 'development':
  envPath = path.resolve(__dirname, '../.env');
  break;
case 'staging':
  envPath = path.resolve(__dirname, '../.env.staging');
  break;
case 'production':
  envPath = path.resolve(__dirname, '../.env.production');
  break;
default:
  envPath = path.resolve(__dirname, '../.env');
  break;
};

dotenv.config({ path: envPath });

const enviroment = {
  /* GENERAL */
  NODE_ENV,
  TIME_ZONE: process.env.TIME_ZONE,
  PORT: process.env.PORT || 8080,
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

module.exports = enviroment;
