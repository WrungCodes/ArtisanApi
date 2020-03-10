'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('profiles', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Profile.associate = function(models) {
    // associations can be defined here
    Profile.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      as: 'user'
    });
  };
  return Profile;
};