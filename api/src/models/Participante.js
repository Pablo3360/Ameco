const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le inyectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define('participante', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dni: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true
    },
    apellidos: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    nombres: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
    },
    sexo: {
      type: DataTypes.ENUM,
      values: ['varon', 'mujer', 'sin especificar'],
      allowNull: false
    },
    relacion: {
      type: DataTypes.ENUM,
      values: ['pareja', 'hijo/a', 'padre/madre', 'otro'],
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    titularId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'titulars',
        key: 'id'
      }
    }
  }, {
    timestamps: true,
    paranoid: true
  });
};

