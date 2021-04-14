import { Model } from "sequelize";

class ProductPage extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    ProductPage.belongsTo(models.Brand, {
      targetKey: "id",
      foreignKey: "brandId",
    });
  }
}

export default (sequelize, DataTypes) => {
  ProductPage.init(
    {
      title: DataTypes.STRING,
      uniqueNumber: DataTypes.INTEGER,
      sourceUrl: DataTypes.STRING,
      brandId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductPage",
    }
  );
  return ProductPage;
};
