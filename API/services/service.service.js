const pool = require('../config/db');

async function getAllServices() {
    try {
        const { rows } = await pool.query("SELECT * FROM services");
        return rows;
    } catch (error) {
        console.error("Error during getAllService", error);
        throw error;    
    }
}

async function getServiceById(id_service) {
    try {
        const { rows } = await pool.query("SELECT * FROM services WHERE id_service = $1", [id_service]);
        return rows[0];
    } catch (error) {
        console.error("Error during getserviceById", error);
        throw error;
    }
}

async function getAllServicesByDga(id_dga) {
    try {
        const { rows } = await pool.query(`
        SELECT s.id_service, s.nom_service
        FROM services s
        JOIN agents a ON s.id_dga = a.id_agent
        WHERE s.id_dga = $1`, [id_dga]);
        return rows;
    } catch (error) {
        console.error("Error during getAllService", error);
        throw error;    
    }
}

async function createService(nom_service,sigle,id_dga) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO services (nom_service,sigle,id_dga) VALUES ($1,$2,$3) RETURNING *",
            [nom_service,sigle,id_dga]
        );
        return rows[0].id_service;
    } catch (error) {
        console.error("Error during createService", error);
        throw error;
    }
}

async function deleteService(id_service) {
    try {
        await pool.query("DELETE FROM services WHERE id_service = $1", [id_service]);
    } catch (error) {
        console.error("Error during deleteService", error);
        throw error;
    }
}

async function updateService(id_service, nom_service, sigle, id_dga) {
    try {
        await pool.query(
            "UPDATE services SET nom_service = $1, sigle = $2, id_dga = $3 WHERE id_service = $4",
            [nom_service, sigle, id_dga, id_service]
        );
        return await getServiceById(id_service);
    } catch (error) {
        console.error("Error during updateService", error);
        throw error;
    }
}


async function getServiceByAgentId(agentId) {
    try {
        const { rows } = await pool.query("SELECT * FROM agents JOIN services ON agents.id_service = services.id_service WHERE agents.id_agent = $1", [agentId]);
        return rows[0];
    } catch (error) {
        console.error("Error during getServiceByAgentId", error);
        throw error;
    }
}

module.exports = {
    getAllServices,
    getServiceById,
    getAllServicesByDga,
    createService,
    deleteService,
    updateService,
    getServiceByAgentId
};
