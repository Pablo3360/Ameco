const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('prestador', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cuit: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    },
    razon: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    domicilio: {
      type: DataTypes.STRING(60)
    },
    localidad: {
      type: DataTypes.STRING(60)
    },
    celular: {
      type: DataTypes.STRING(12)
    },
    mail: {
      type:DataTypes.STRING(60)
    },
    matricula: {
      type:DataTypes.STRING(15)
    }
  });
};