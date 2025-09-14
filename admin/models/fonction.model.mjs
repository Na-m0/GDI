import { DataTypes, Model } from 'sequelize';
import sequelize from './index.mjs';

class Fonction extends Model {}

Fonction.init({
  id_fonction: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_fonction: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Fonction',
  tableName: 'fonctions',
  timestamps: false, 
});

export default Fonction;
