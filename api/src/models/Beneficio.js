const { DataTypes } = require('sequelize');

const BeneficioFn = (sequelize) => {
  sequelize.define('beneficio', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    codigo_unico: {
      type: DataTypes.STRING(5),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(60)
    }
  }, {
    timestamps: false
  });
};

module.exports = BeneficioFn;