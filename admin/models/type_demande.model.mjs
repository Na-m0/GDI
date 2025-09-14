import { DataTypes, Model } from 'sequelize';
import sequelize from './index.mjs';

class TypeDemande extends Model {}

TypeDemande.init({
  id_type: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'TypeDemande',
  tableName: 'types_demandes',
  timestamps: false,
});

export default TypeDemande;
