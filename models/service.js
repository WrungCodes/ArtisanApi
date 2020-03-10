'use strict';
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    name: DataTypes.STRING,
    discription: DataTypes.TEXT,
    priceMin: DataTypes.FLOAT,
    priceMax: DataTypes.FLOAT
  }, {});
  Service.associate = function(models) {
    // associations can be defined here
  };
  return Service;
};