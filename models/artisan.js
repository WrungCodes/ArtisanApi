'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artisan = sequelize.define('artisan', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    category: DataTypes.STRING,
    subcategory: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  Artisan.associate = function(models) {
    // associations can be defined here
    Artisan.hasMany(models.services, {
      foreignKey: 'artisanId',
      onDelete: 'CASCADE',
      as: 'services'
    });
  };
  return Artisan;
};