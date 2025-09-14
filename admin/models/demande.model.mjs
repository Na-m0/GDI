import { DataTypes, Model } from 'sequelize';
import sequelize from './index.mjs';

// Importation des modèles référencés
import Service from './service.model.mjs';
import Priorite from './priorite.model.mjs';
import CampagneBudgetaire from './campagne_budgetaire.model.mjs';
import Status from './status.model.mjs';
import TypeDemande from './type_demande.model.mjs';
import Agent from './agent.model.mjs';

class Demande extends Model {}

Demande.init({
    id_demande: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    objet: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    justificatif: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    cpu: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    budget_estimatif: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
    },
    date_creation: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    transmition: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    date_transmission: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    date_limite_validation: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    id_service: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Service,
            key: 'id_service',
        },
    },
    id_priorite: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Priorite,
            key: 'id_priorite',
        },
    },
    id_campagne: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CampagneBudgetaire,
            key: 'id_campagne',
        },
    },
    id_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Status,
            key: 'id_status',
        },
    },
    id_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TypeDemande,
            key: 'id_type',
        },
    },
    id_agent: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Agent,
            key: 'id_agent',
        },
    },
    avis_responsable: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    avis_dga: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    avis_dgs: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    avis_sicig: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    motif_responsable: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    motif_dga: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    motif_dgs: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    motif_sicig: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Demande',
    tableName: 'demandes',
    timestamps: false,
});
// Ajoutez les associations ici
Demande.belongsTo(Service, { foreignKey: 'id_service' });
Demande.belongsTo(Priorite, { foreignKey: 'id_priorite' });
Demande.belongsTo(CampagneBudgetaire, { foreignKey: 'id_campagne' });
Demande.belongsTo(Status, { foreignKey: 'id_status' });
Demande.belongsTo(TypeDemande, { foreignKey: 'id_type' });
Demande.belongsTo(Agent, { foreignKey: 'id_agent' });

export default Demande;
