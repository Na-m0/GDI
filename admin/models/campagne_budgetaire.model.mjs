import { DataTypes, Model } from 'sequelize';
import sequelize from './index.mjs'; 
import Status from './status.model.mjs';

class CampagneBudgetaire extends Model {}

CampagneBudgetaire.init({
  id_campagne: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_campagne: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  date_debut: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  date_fin: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  date_creation: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  id_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Status,
      key: 'id_status',
    },
  },
}, {
  sequelize,
  modelName: 'CampagneBudgetaire',
  tableName: 'campagnes_budgetaires',
  timestamps: false,
});

export default CampagneBudgetaire;
