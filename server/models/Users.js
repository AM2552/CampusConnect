module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    moderator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    banned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Assuming users are not banned by default
    }

  });
  
  Users.associate = (models) => {
    Users.hasMany(models.Posts)
  }
  return Users;

};
