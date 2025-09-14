const pool = require('../config/db');

async function getAllPriorites() {
    try {
        const { rows } = await pool.query("SELECT * FROM priorites");
        return rows;
    } catch (error) {
        console.error("Error during getAllPriorite", error);
        throw error;    
    }
}

async function getPrioriteById(id_priorite) {
    try {
        const { rows } = await pool.query("SELECT * FROM priorites WHERE id_priorite = $1", [id_priorite]);
        return rows[0];
    } catch (error) {
        console.error("Error during getprioriteById", error);
        throw error;
    }
}

async function createPriorite(nom_priorite) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO priorites (nom_priorite) VALUES ($1) RETURNING id_priorite",
            [nom_priorite]
        );
        return rows[0].id_priorite;
    } catch (error) {
        console.error("Error during createPriorite", error);
        throw error;
    }
}

async function deletePriorite(id_priorite) {
    try {
        await pool.query("DELETE FROM priorites WHERE id_priorite = $1", [id_priorite]);
    } catch (error) {
        console.error("Error during deletePriorite", error);
        throw error;
    }
}

async function updatePriorite(id_priorite, nom_priorite) {
    try {
        await pool.query(
            "UPDATE priorites SET nom_priorite = $1 WHERE id_priorite = $2",
            [nom_priorite, id_priorite]
        );
        return await getPrioriteById(id_priorite);
    } catch (error) {
        console.error("Error during updatePriorite", error);
        throw error;
    }
}

module.exports = {
    getAllPriorites,
    getPrioriteById,
    createPriorite,
    deletePriorite,
    updatePriorite
};
