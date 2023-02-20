const { DataTypes } = require('sequelize');

const GrupoCodigoFn = (sequelize) => {
  sequelize.define('grupoCodigo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true
    },
    descripcion: {
      type: DataTypes.STRING(60)
    },
    beneficioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'beneficios',
        key: 'id'
      }
    }
  }, {
    timestamps: false
  });
};

module.exports = GrupoCodigoFn;