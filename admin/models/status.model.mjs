import { DataTypes, Model } from 'sequelize';
import sequelize from './index.mjs';

class Status extends Model {}

Status.init({
  id_status: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_status: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Status',
  tableName: 'status',
  timestamps: false,
});

export default Status;
