module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING,
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
    tableName: 'user',
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: {
        name: 'user',
        allowNull: false
      },
    });
    User.belongsToMany(User, {
      through: "CloseFriend",
      foreignKey: 'username_src',
      as: 'user_dest'
    });
    User.belongsToMany(User, {
      through: "CloseFriend",
      foreignKey: 'username_dest',
      as: "user_src"
    });
  };

  return User;
}