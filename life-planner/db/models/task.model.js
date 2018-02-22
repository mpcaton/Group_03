'use strict';
module.exports = (sequelize, DataTypes) => {
  let Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Task.associate = function(models) {
    Task.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Task;
};
