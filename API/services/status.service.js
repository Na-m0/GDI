const pool = require('../config/db');

async function getAllStatus() {
    try {
        const { rows } = await pool.query("SELECT * FROM status");
        return rows;
    } catch (error) {
        console.error("Error during getAllStatus", error);
        throw error;    
    }
}

async function getStatusById(id_status) {
    try {
        const { rows } = await pool.query("SELECT * FROM status WHERE id_status = $1", [id_status]);
        return rows[0];
    } catch (error) {
        console.error("Error during getStatusById", error);
        throw error;
    }
}

async function createStatus(nom_status) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO status (nom_status) VALUES ($1) RETURNING id_status",
            [nom_status]
        );
        return rows[0].id_status;
    } catch (error) {
        console.error("Error during createStatus", error);
        throw error;
    }
}

async function deleteStatus(id_status) {
    try {
        await pool.query("DELETE FROM status WHERE id_status = $1", [id_status]);
    } catch (error) {
        console.error("Error during deleteStatus", error);
        throw error;
    }
}

async function updateStatus(id_status, nom_status) {
    try {
        await pool.query(
            "UPDATE status SET nom_status = $1 WHERE id_status = $2",
            [nom_status, id_status]
        );
        return await getStatusById(id_status);
    } catch (error) {
        console.error("Error during updateStatus", error);
        throw error;
    }
}

module.exports = {
    getAllStatus,
    getStatusById,
    createStatus,
    deleteStatus,
    updateStatus
};
