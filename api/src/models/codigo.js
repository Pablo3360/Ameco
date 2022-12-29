const { DataTypes } = require('sequelize');

const CodigoFn = (sequelize) => {
  sequelize.define('codigo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    grupo: {
      type: DataTypes.STRING(15),
      allowNull: false,
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
    beneficioId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'beneficios',
        key: 'id'
      }
    }
  }, 
  {
    uniqueKeys: {
      grupo_codigo: {
        fields: ['grupo', 'codigo']
      }
    }
  });
};

module.exports = CodigoFn;