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
    cuit: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true
    },
    mail: {
      type:DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false
  });
};