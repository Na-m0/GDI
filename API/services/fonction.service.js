const pool = require('../config/db');

async function getAllFonctions() {
    try {
        const { rows } = await pool.query("SELECT * FROM fonctions");
        return rows;
    } catch (error) {
        console.error("Error during getAllFonction", error);
        throw error;    
    }
}

async function getFonctionById(id_fonction) {
    try {
        const { rows } = await pool.query("SELECT * FROM fonctions WHERE id_fonction = $1", [id_fonction]);
        return rows[0];
    } catch (error) {
        console.error("Error during getfonctionById", error);
        throw error;
    }
}

async function createFonction(nom_fonction) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO fonctions (nom_fonction) VALUES ($1) RETURNING id_fonction",
            [nom_fonction]
        );
        return rows[0].id_fonction;
    } catch (error) {
        console.error("Error during createFonction", error);
        throw error;
    }
}

async function deleteFonction(id_fonction) {
    try {
        await pool.query("DELETE FROM fonctions WHERE id_fonction = $1", [id_fonction]);
    } catch (error) {
        console.error("Error during deleteFonction", error);
        throw error;
    }
}

async function updateFonction(id_fonction, nom_fonction) {
    try {
        await pool.query(
            "UPDATE fonctions SET nom_fonction = $1 WHERE id_fonction = $2",
            [nom_fonction, id_fonction]
        );
        return await getFonctionById(id_fonction);
    } catch (error) {
        console.error("Error during updateFonction", error);
        throw error;
    }
}

module.exports = {
    getAllFonctions,
    getFonctionById,
    createFonction,
    deleteFonction,
    updateFonction,
};
