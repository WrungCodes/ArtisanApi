'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    verify_token: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.profiles, {
      foreignKey: 'userId',
      as: 'profile'
    });
    // Users.hasOne(models.profiles, {
    //   foreignKey: 'userId',
    //   as: 'profile'
    // });
  };
  return User;
};