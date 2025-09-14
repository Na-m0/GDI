const pool = require('../config/db');

async function getAllTypes() {
    try {
        const { rows } = await pool.query("SELECT * FROM types_demandes");
        return rows;
    } catch (error) {
        console.error("Error during getAllType", error);
        throw error;    
    }
}

async function getTypeById(id_type) {
    try {
        const { rows } = await pool.query("SELECT * FROM types_demandes WHERE id_type = $1", [id_type]);
        return rows[0];
    } catch (error) {
        console.error("Error during getTypeById", error);
        throw error;
    }
}

async function createType(nom_type) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO types_demandes (nom_type) VALUES ($1) RETURNING id_type",
            [nom_type]
        );
        return rows[0].id_type;
    } catch (error) {
        console.error("Error during createType", error);
        throw error;
    }
}

async function deleteType(id_type) {
    try {
        await pool.query("DELETE FROM types_demandes WHERE id_type = $1", [id_type]);
    } catch (error) {
        console.error("Error during deleteType", error);
        throw error;
    }
}

async function updateType(id_type, nom_type) {
    try {
        await pool.query(
            "UPDATE types_demandes SET nom_type = $1 WHERE id_type = $2",
            [nom_type, id_type]
        );
        return await getTypeById(id_type);
    } catch (error) {
        console.error("Error during updateType", error);
        throw error;
    }
}

module.exports = {
    getAllTypes,
    getTypeById,
    createType,
    deleteType,
    updateType
};
