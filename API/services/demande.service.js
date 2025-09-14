const pool = require('../config/db');

async function getAllDemandes() {
    try {
        const { rows } = await pool.query("SELECT * FROM demandes ORDER BY demandes.date_creation DESC");
        return rows;
    } catch (error) {
        console.error("Error during getAllDemande", error);
        throw error;    
    }
}

async function getDemandeById(id_demande) {
    try {
        const { rows } = await pool.query(`SELECT demandes.*,priorites.*,status.*,types_demandes.*,campagnes_budgetaires.date_fin, campagnes_budgetaires.date_debut, campagnes_budgetaires.nom_campagne 
            FROM demandes 
            JOIN priorites ON demandes.id_priorite = priorites.id_priorite 
            JOIN status ON demandes.id_status = status.id_status 
            JOIN types_demandes ON demandes.id_type = types_demandes.id_type 
            JOIN campagnes_budgetaires ON campagnes_budgetaires.id_campagne = demandes.id_campagne 
            WHERE id_demande = $1`, [id_demande]);
        return rows[0];
    } catch (error) {
        console.error("Error during getdemandeById", error);
        throw error;
    }
}

async function createDemande(objet, justificatif, cpu, budget_estimatif, date_creation, 
    transmition, date_transmission, date_limite_validation, id_service, id_priorite, 
    id_campagne, id_status, id_type, id_agent, avis_responsable, avis_dga, avis_dgs, avis_sicig, motif_responsable, motif_dga, motif_dgs, motif_sicig ) {
    try {
        const { rows } = await pool.query(
            `INSERT INTO demandes (objet, justificatif, cpu, budget_estimatif, date_creation, 
                transmition, date_transmission, date_limite_validation, id_service, 
                id_priorite, id_campagne, id_status, id_type, id_agent, avis_responsable, avis_dga, avis_dgs, avis_sicig, motif_responsable, motif_dga, motif_dgs, motif_sicig) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *
            `,[objet, justificatif, cpu, budget_estimatif, date_creation, 
                transmition, date_transmission, date_limite_validation, 
                id_service, id_priorite, id_campagne, id_status, id_type, id_agent, avis_responsable, avis_dga, avis_dgs, avis_sicig, motif_responsable, motif_dga, motif_dgs, motif_sicig]
        );
        return rows[0].id_demande;
    } catch (error) {
        console.error("Error during createDemande", error);
        throw error;
    }
}

async function deleteDemande(id_demande) {
    try {
        await pool.query("DELETE FROM demandes WHERE id_demande = $1", [id_demande]);
    } catch (error) {
        console.error("Error during deleteDemande", error);
        throw error;
    }
}

async function updateDemande(id_demande, objet, justificatif, cpu, 
    budget_estimatif, date_creation, transmition, date_transmission, 
    date_limite_validation, id_service, id_priorite, id_campagne, id_status, id_type, id_agent, avis_responsable, avis_dga, avis_dgs, avis_sicig, motif_responsable, motif_dga, motif_dgs, motif_sicig,) {
    try {
        const { rows } = await pool.query(
            `UPDATE demandes SET objet = $1, 
            justificatif = $2, cpu = $3, 
            budget_estimatif = $4, date_creation = $5,
            transmition = $6, date_transmission = $7, 
            date_limite_validation = $8, id_service = $9, 
            id_priorite = $10, id_campagne = $11, id_status = $12, 
            id_type = $13, id_agent = $14, avis_responsable = $15, 
            avis_dga = $16, avis_dgs = $17, avis_sicig = $18, motif_responsable = $19, motif_dga = $20, motif_dgs = $21, motif_sicig = $22 WHERE id_demande = $23
            `,[objet, justificatif, cpu, budget_estimatif, date_creation, 
                transmition, date_transmission, date_limite_validation, id_service, 
                id_priorite, id_campagne, id_status, id_type, id_agent, avis_responsable, avis_dga, avis_dgs, avis_sicig, motif_responsable, motif_dga, motif_dgs, motif_sicig, id_demande]
        );
        return rows[0];
    } catch (error) {
        console.error("Error during updateDemande", error);
        throw error;
    }
}

async function updateDemandeStatus(id_demande, id_status) {
    try {
        await pool.query(
            "UPDATE demandes SET id_status = $1 WHERE id_demande = $2",
            [id_status, id_demande]
        );
    } catch (error) {
        console.error("Error during updateDemandeStatus", error);
        throw error;
    }
}

async function updateMotifDemande(id_demande, motif_responsable, motif_dga, motif_dgs, motif_sicig) {
    try {
        await pool.query(
            "UPDATE demandes SET motif_responsable = $1, motif_dga = $2, motif_dgs= $3, motif_sicig = $4 WHERE id_demande = $5",
            [motif_responsable, motif_dga, motif_dgs, motif_sicig, id_demande]
        );
    } catch (error) {
        console.error("Error during updateMotifDemande", error);
        throw error;
    }
}

// récupère toutes les demandes d'un service
async function getDemandesByServiceId(serviceId) {
    try {
        const { rows } = await pool.query(`SELECT demandes.*, priorites.*,status.*, types_demandes.*, campagnes_budgetaires.date_fin, campagnes_budgetaires.date_debut, campagnes_budgetaires.nom_campagne FROM demandes 
            JOIN priorites ON demandes.id_priorite = priorites.id_priorite 
            JOIN status ON demandes.id_status = status.id_status 
            JOIN campagnes_budgetaires ON campagnes_budgetaires.id_campagne = demandes.id_campagne
            JOIN types_demandes ON demandes.id_type = types_demandes.id_type WHERE id_service = $1 ORDER BY demandes.date_creation DESC`, [serviceId]);
        return rows;
    } catch (error) {
        console.error("Error during getDemandesByServiceId", error);
        throw error;
    }
}

// récupère la somme des budgets des demandes d'un service
async function getSumBudgetByServiceId(serviceId) {
    try {
        const { rows } = await pool.query("SELECT SUM(budget_estimatif) AS sum_budget FROM demandes WHERE id_service = $1", [serviceId]);
        return rows[0].sum_budget;
    } catch (error) {
        console.error("Error during getSumBudgetByServiceId", error);
        throw error;
    }
}

async function getSumBudgetByDgaId(id_dga) {
    try {
        const { rows } = await pool.query(`
        SELECT SUM(budget_estimatif) AS sum_budget 
        FROM agents a
        JOIN services s ON s.id_dga = a.id_agent
        JOIN demandes d ON d.id_service = s.id_service
        WHERE a.id_agent = $1`, [id_dga]);
        return rows[0].sum_budget;
    } catch (error) {
        console.error("Error during getSumBudgetByServiceId", error);
        throw error;
    }
}

// récupère le nombre de demandes d'un statut dans un service
async function getNombreDemandesByStatusAndService(id_statut, id_service) {
    try {
        const { rows } = await pool.query(`
        SELECT s.nom_status, COUNT(d.id_demande) AS nombre_demandes
        FROM status s
        LEFT JOIN demandes d ON s.id_status = d.id_status
        WHERE s.id_status = $1 AND d.id_service = $2
        GROUP BY s.nom_status
        `, [id_statut, id_service]);

        return rows[0];
    } catch (error) {
        console.error("Error during getNombreDemandesParStatut", error);
        throw error;
    }
}

async function getNombreDemandesByStatutAndDga(id_statut, id_dga) {
    try {
        const { rows } = await pool.query(`
        SELECT COUNT(d.id_demande) AS nombre_demandes
        FROM agents a
        JOIN services s ON s.id_dga = a.id_agent
        JOIN demandes d ON d.id_service = s.id_service
        JOIN status st ON st.id_status = d.id_status
        WHERE st.id_status = $1 AND a.id_agent = $2
        `, [id_statut, id_dga]);

        return rows[0];
    } catch (error) {
        console.error("Error during getNombreDemandesParStatut", error);
        throw error;
    }
}

async function getDemandesServicesDga(id_dga) {
    try {
        const { rows } = await pool.query(`
        SELECT services.id_dga, services.nom_service, demandes.*, priorites.*, status.*,  types_demandes.*, campagnes_budgetaires.date_fin, campagnes_budgetaires.date_debut, campagnes_budgetaires.nom_campagne
        FROM demandes
        JOIN services ON demandes.id_service = services.id_service
        JOIN agents ON demandes.id_agent = agents.id_agent
        JOIN priorites ON demandes.id_priorite = priorites.id_priorite 
        JOIN status ON demandes.id_status = status.id_status 
        JOIN types_demandes ON demandes.id_type = types_demandes.id_type
        JOIN campagnes_budgetaires ON demandes.id_campagne = campagnes_budgetaires.id_campagne
        WHERE services.id_dga = $1
        ORDER BY demandes.date_creation DESC
        `, [id_dga]);

        return rows;
    } catch (error) {
        console.error("Error during getNombreDemandesParStatut", error);
        throw error;
    }
}

async function getDemandesDgs(id_dgs) {
    try {
        const { rows } = await pool.query(`
        SELECT 
            d.*,s.*, p.*,t.*,st.*,dg.*, campagnes_budgetaires.date_fin, campagnes_budgetaires.date_debut, campagnes_budgetaires.nom_campagne
        FROM 
            demandes d
        JOIN 
            services s ON d.id_service = s.id_service
        JOIN 
            priorites p ON d.id_priorite = p.id_priorite
        JOIN 
            types_demandes t ON d.id_type = t.id_type
        JOIN 
            status st ON d.id_status = st.id_status
        JOIN 
            campagnes_budgetaires ON d.id_campagne = campagnes_budgetaires.id_campagne
        JOIN 
            dgsdga dg ON dg.id_dgs = $1
        WHERE 
            s.id_dga = dg.id_dga
        ORDER BY 
            d.date_creation DESC
        `, [id_dgs]);
        return rows;
    } catch (error) {
        console.error("Error during getNombreDemandesParStatut", error);
        throw error;
    }
}

module.exports = {
    getDemandesServicesDga,
    getAllDemandes,
    getDemandeById,
    createDemande,
    deleteDemande,
    updateDemande,
    updateDemandeStatus,
    updateMotifDemande,
    getDemandesByServiceId,
    getSumBudgetByServiceId,
    getSumBudgetByDgaId,
    getNombreDemandesByStatusAndService,
    getNombreDemandesByStatutAndDga,
    getDemandesDgs
};
