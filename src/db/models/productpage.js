import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ProductPage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductPage.belongsTo(models.Brand); // foreignKey 와 targetKey 는 자체적으로 암묵적으로 생성한다고 합니다. 별도로 지정할 수는 있습니다.
    }
  }

  ProductPage.init(
    {
      title: DataTypes.STRING,
      uniqueNumber: DataTypes.INTEGER,
      sourceUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductPage",
    }
  );
  return ProductPage;
};
