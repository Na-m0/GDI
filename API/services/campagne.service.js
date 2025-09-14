const pool = require('../config/db');

async function getAllCampagnes() {
    try {
        const { rows } = await pool.query("SELECT * FROM campagnes_budgetaires");
        return rows;
    } catch (error) {
        console.error("Error during getAllCampagne", error);
        throw error;    
    }
}

async function getCampagneById(id_campagne) {
    try {
        const { rows } = await pool.query("SELECT * FROM campagnes_budgetaires WHERE id_campagne = $1", [id_campagne]);
        return rows[0];
    } catch (error) {
        console.error("Error during getcampagneById", error);
        throw error;
    }
}

async function createCampagne(nom_campagne, description, date_debut, date_fin, date_creation, id_status) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO campagnes_budgetaires (nom_campagne, description, date_debut, date_fin, date_creation, id_status) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [nom_campagne, description, date_debut, date_fin, date_creation, id_status]
        );
        return rows[0].id_campagne;
    } catch (error) {
        console.error("Error during createCampagne", error);
        throw error;
    }
}

async function deleteCampagne(id_campagne) {
    try {
        await pool.query("DELETE FROM campagnes_budgetaires WHERE id_campagne = $1", [id_campagne]);
    } catch (error) {
        console.error("Error during deleteCampagne", error);
        throw error;
    }
}

async function updateCampagne(id_campagne, nom_campagne, description, date_debut, date_fin, date_creation, id_status) {
    try {
        await pool.query(
            "UPDATE campagnes_budgetaires SET nom_campagne = $1, description = $2, date_debut = $3, date_fin = $4, date_creation = $5, id_status = $6 WHERE id_campagne = $7",
            [nom_campagne, description, date_debut, date_fin, date_creation, id_status, id_campagne]
        );
        return await getCampagneById(id_campagne);
    } catch (error) {
        console.error("Error during updateCampagne", error);
        throw error;
    }
}

module.exports = {
    getAllCampagnes,
    getCampagneById,
    createCampagne,
    deleteCampagne,
    updateCampagne
};
