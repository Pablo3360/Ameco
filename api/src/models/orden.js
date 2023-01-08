const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('orden', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    dataTitular: {
      type: DataTypes.JSONB
    },
    dataBeneficiario: {
      type: DataTypes.JSONB
    },
    dataBeneficio: {
      type: DataTypes.JSONB
    },
    dataGrupoCodigo: {
      type: DataTypes.JSONB
    },
    dataCodigos: {
      type: DataTypes.JSONB
    },
    dataPrestador: {
      type: DataTypes.JSONB
    },
    dataMontos: {
      type: DataTypes.JSONB
    },
    dataEmisor: {
      type: DataTypes.JSONB
    },
    descripcion: {
      type:DataTypes.STRING(50),
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
    paranoid: true,
    updatedAt: false,
  });
};