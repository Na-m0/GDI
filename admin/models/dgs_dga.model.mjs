import { DataTypes, Model } from 'sequelize';
import sequelize from './index.mjs'; 
import Agent from './agent.model.mjs'; 

class DgsDga extends Model {}

DgsDga.init({
  id_dgs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Agent,
      key: 'id_agent',
    },
  },
  id_dga: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Agent,
      key: 'id_agent',
    },
  },
}, {
  sequelize,
  modelName: 'DgsDga',
  tableName: 'dgsdga',
  timestamps: false,
});

export default DgsDga;
