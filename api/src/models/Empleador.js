const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('empleador', {
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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    recaudadorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'recaudadors',
        key: 'id'
      }
    }
  }, {
    timestamps: false
  });
};