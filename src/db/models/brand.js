import { Model } from "sequelize";

class Brand extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Brand.hasMany(models.ProductPage, {
      foreignKey: "brandId",
    });
  }
}

export default (sequelize, DataTypes) => {
  Brand.init(
    {
      name: DataTypes.STRING,
      pixelCode: DataTypes.STRING,
      platformApiId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Brand",
    }
  );

  return Brand;
};
