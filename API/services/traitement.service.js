const pool = require('../config/db');

async function getAllTraitements() {
    try {
        const { rows } = await pool.query("SELECT * FROM traitements_demandes");
        return rows;
    } catch (error) {
        console.error("Error during getAllTraitement", error);
        throw error;    
    }
}

async function getTraitementById(id_traitement) {
    try {
        const { rows } = await pool.query("SELECT * FROM traitements_demandes WHERE id_traitement = $1", [id_traitement]);
        return rows[0];
    } catch (error) {
        console.error("Error during gettraitementById", error);
        throw error;
    }
}

async function createTraitement(avis_sicig, date_avis, id_demande) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO traitements_demandes (avis_sicig, date_avis, id_demande) VALUES ($1, $2, $3) RETURNING id_traitement",
            [avis_sicig, date_avis, id_demande]
        );
        return rows[0].id_traitement;
    } catch (error) {
        console.error("Error during createTraitement", error);
        throw error;
    }
}

async function deleteTraitement(id_traitement) {
    try {
        await pool.query("DELETE FROM traitements_demandes WHERE id_traitement = $1", [id_traitement]);
    } catch (error) {
        console.error("Error during deleteTraitement", error);
        throw error;
    }
}

async function updateTraitement(id_traitement, avis_sicig, date_avis, id_demande) {
    try {
        await pool.query(
            "UPDATE traitements_demandes SET avis_sicig = $1, date_avis = $2, id_demande = $3 WHERE id_traitement = $4",
            [avis_sicig, date_avis, id_demande, id_traitement]
        );
        return await getTraitementById(id_traitement);
    } catch (error) {
        console.error("Error during updateTraitement", error);
        throw error;
    }
}

module.exports = {
    getAllTraitements,
    getTraitementById,
    createTraitement,
    deleteTraitement,
    updateTraitement
};
