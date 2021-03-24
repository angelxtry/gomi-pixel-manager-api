// const fs = require("fs");
// const path = require("path");
// const Sequelize = require("sequelize");
// const env = process.env.NODE_ENV || "development";
// const config = require(`${__dirname}/../config`)[env];

import path from "path";
import Sequelize from "sequelize";
import config from "../config";

import brandModel from "./brand";
import productPageModel from "./productpage";

const basename = path.basename(__filename);
// console.log(env, config);

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// fs.readdirSync(__dirname)
//   .filter((file) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(
//       sequelize,
//       Sequelize.DataTypes
//     );
//     db[model.name] = model;
//   });
const Brand = brandModel(sequelize, Sequelize.DataTypes);
db[Brand.name] = Brand;
console.log(new Brand());

const productPage = productPageModel(sequelize, Sequelize.DataTypes);
db[productPage.name] = productPage;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
