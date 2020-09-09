module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: { 
      autoIncrement: true, 
      primaryKey: true, 
      type: Sequelize.INTEGER 
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    follower: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    following: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    post_count: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    rating: {
      type: Sequelize.REAL,
      allowNull: false,
      defaultValue: 0
    }
  });

  return User;
};