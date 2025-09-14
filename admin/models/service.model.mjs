import { DataTypes, Model } from 'sequelize';
import sequelize from './index.mjs'; 

class Service extends Model {}

Service.init({
  id_service: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
 
  nom_service: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  // ...
  id_dga: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'agents', 
      key: 'id_agent',
    },
  },
}, {
  sequelize,
  modelName: 'Service',
  tableName: 'services',
  timestamps: false,
});

export default Service;
