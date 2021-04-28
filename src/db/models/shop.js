import { Model } from 'sequelize';

class Shop extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Shop.hasMany(models.PixelCode);
  }
}

export default (sequelize, DataTypes) => {
  Shop.init({
    name: DataTypes.STRING,
    domain: DataTypes.STRING,
  },
    {
    sequelize,
    modelName: 'Shop',
  });
  return Shop;
};
