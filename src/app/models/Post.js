import { Model, Sequelize } from 'sequelize';

class Post extends Model {
  static init(sequelize) {
    super.init(
      {
        content: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'image' });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Post;
