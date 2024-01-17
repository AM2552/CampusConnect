module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.belongsTo(models.User, {
      foreignKey: 'UserId',
      as: 'user',
    });
  };

  return Posts;
};