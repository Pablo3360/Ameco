const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    apellidos: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    nombres: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    mail: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    permisos: {
      type: DataTypes.ARRAY(DataTypes.STRING(20)),
    }
  }, {
    hooks: {
        afterCreate: (record) => {
            delete record.dataValues.passwordHash;
        },
        afterUpdate: (record) => {
            delete record.dataValues.passwordHash;
        },
    },
    paranoid: true,
    createdAt: false,
    updatedAt: false,
    paranoid: true
  });
};