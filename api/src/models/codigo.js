const { DataTypes } = require('sequelize');

const CodigoFn = (sequelize) => {
  sequelize.define('codigo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    codigo: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(60)
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    grupoCodigoId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'grupoCodigos',
        key: 'id'
      }
    }
  }, 
  {
    uniqueKeys: {
      codigo_grupoCodigoId: {
        fields: ['codigo', 'grupoCodigoId']
      }
    }
  });
};

module.exports = CodigoFn;