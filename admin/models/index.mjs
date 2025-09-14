import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:2812@localhost:5432/projet');

// Synchroniser les modèles
(async () => {
    await sequelize.sync({ alter: true }); // alter true pour mise à jour sans perte de données
})();

export default sequelize;
