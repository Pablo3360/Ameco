const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('orden', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titular: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    beneficiario: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    beneficio: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    codigo: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    prestador: {
      type:DataTypes.STRING(60),
      allowNull: false
    },
    precio: {
      type:DataTypes.STRING(15),
      allowNull: false
    },
    emisor: {
      type:DataTypes.STRING(60),
      allowNull: false
    },
    descripcion: {
      type:DataTypes.STRING(15),
      allowNull: false
    },
    titularId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'titulars',
        key: 'id'
      }
    }
  });
};