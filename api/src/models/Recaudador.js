const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('recaudador', {
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
    dni: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    mail: {
      type:DataTypes.STRING(60),
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: true,
    paranoid: true
  });
};