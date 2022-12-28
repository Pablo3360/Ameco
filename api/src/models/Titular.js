const { DataTypes } = require('sequelize');

const TitularFn = (sequelize) => {
  sequelize.define('titular', {
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
    tipo: {
      type: DataTypes.ENUM('activo', 'adherente'),
      allowNull: false
    },
    domicilio: {
      type: DataTypes.STRING(60)
    },
    localidad: {
      type: DataTypes.STRING(60)
    },
    nacimiento: {
      type: DataTypes.DATEONLY,
      // allowNull: false
    },
    sexo: {
      type: DataTypes.ENUM,
      values: ['varon', 'mujer', 'sin especificar'],
      allowNull: false
    },
    estado_civil: {
      type: DataTypes.ENUM('casado/a', 'soltero/a', 'union de hecho', 'sin especificar')
    },
    celular: {
      type: DataTypes.STRING(12)
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    empleadorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'empleadors',
        key: 'id'
      }
    }
  }, {
    timestamps: false
  });
};

module.exports = TitularFn;