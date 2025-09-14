import { DataTypes, Model } from 'sequelize';
import sequelize from './index.mjs';
import Fonction from './fonction.model.mjs';
import Agent from './agent.model.mjs';

class Possede extends Model {}

Possede.init({
  id_fonction: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Fonction,
      key: 'id_fonction',
    },
  },
  id_agent: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: Agent,
      key: 'id_agent',
    },
  },
}, {
  sequelize,
  tableName: 'possede',
  timestamps: false,
});

Possede.belongsTo(Agent, { foreignKey: 'id_agent', targetKey: 'id_agent' });
Possede.belongsTo(Fonction, { foreignKey: 'id_fonction', targetKey: 'id_fonction' });

export default Possede;
