import { Model } from "sequelize";

class PixelCode extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    PixelCode.belongsTo(models.Brand, { targetKey: "id", foreignKey: "brandId" });
    PixelCode.belongsTo(models.Shop, { targetKey: "id", foreignKey: "shopId" });
  }

  get isSuperPixel() {
    return !!this.brandId;
  }
}

export default (sequelize, DataTypes) => {
  PixelCode.init(
    {
      code: DataTypes.STRING,
      shopName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PixelCode",
    }
  );

  return PixelCode;
};
