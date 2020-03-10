'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subcategory = sequelize.define('Subcategory', {
    name: DataTypes.STRING,
    discription: DataTypes.TEXT
  }, {});
  Subcategory.associate = function(models) {
    // associations can be defined here
  };
  return Subcategory;
};