module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    uid: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });

  return User;
};
