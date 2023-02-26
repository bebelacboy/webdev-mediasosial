module.exports = (sequelize, DataTypes) => {
  const CloseFriend = sequelize.define('CloseFriend', {
    username_src: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      references: {
       model: 'User',
       key: 'username',
      }
    },
    username_dest: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'User',
        key: 'username',
      }
    }
  }, {
    tableName: 'close_friend'
  });

  return CloseFriend;
}