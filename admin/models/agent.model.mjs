import { DataTypes, Model } from 'sequelize';
import sequelize from './index.mjs';
import Service from './service.model.mjs';

class Agent extends Model {}

Agent.init({
  id_agent: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_agent: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  login_agent: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email_agent: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password_agent: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  id_service: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Service,
      key: 'id_service',
    },
  },
}, {
  sequelize,
  modelName: 'Agent',
  tableName: 'agents',
  timestamps: false,
});

export default Agent;
