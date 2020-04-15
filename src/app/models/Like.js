import { Model } from 'sequelize';

class Like extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Post, { foreignKey: 'post_id' });
  }
}

export default Like;
