import Sequelize from "sequelize";
import config from "../config";

// 모델 생성자
import brandModel from "./brand";
import productPageModel from "./productpage";

const modelMakers = [brandModel, productPageModel];

// DB 셋업
const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/**
 * 관계 모델 팩토리
 */

modelMakers.forEach((modelMaker) => {
  const model = modelMaker(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

/**
 * 모듈화
 */

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
