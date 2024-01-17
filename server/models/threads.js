module.exports = (sequelize, DataTypes) => {
  //creates table in database called Threads
  const Threads = sequelize.define("Threads", {
    //creates title, threadText and username columns in table
    title: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    threadText: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNULL: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    closed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  Threads.associate = (models) => {
    Threads.hasMany(models.Posts, {
      onDelete: "cascade",
    });
  };

  return Threads;
};
