import { DataTypes, Model } from 'sequelize';
import sequelize from './index.mjs';

class Priorite extends Model {}

Priorite.init({
  id_priorite: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_priorite: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Priorite',
  tableName: 'priorites', 
  timestamps: false, 
});

export default Priorite;
