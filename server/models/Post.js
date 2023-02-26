module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'User',
        key: 'username'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    tableName: 'post',
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: {
        name: 'user',
        allowNull: false
      },
    });
  };

  return Post;
}