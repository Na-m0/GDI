const jwt = require('jsonwebtoken');
const pool = require('../config/db');

async function loginAgent(login_agent, password_agent) {
    try {
        // on récupére l'agent avec le login écrit
        const { rows } = await pool.query("SELECT * FROM agents WHERE login_agent = $1", [login_agent]);

        // on vérifie si l'agent existe
        if (rows.length === 0) {
            return { error: 'Agent non trouvé' };
        }

        // on récupère le premier agent trouvé
        const agent = rows[0];

        // on vérifie si le mot de passe écrit correspond au mot de passe de l'agent dans la BDD
        if (agent.password_agent !== password_agent) {
            return { error: 'Mot de passe incorrect' };
        }

        // et enfin, on génère un token JWT contenant l'ID de l'agent
        const token = jwt.sign(
            { id_agent: agent.id_agent }, // Payload du token avec l'id de l'agent
            process.env.JWT_SECRET, // Clé secrète pour signer le token
            { expiresIn: '1h' } // Durée de validité du token
        );
        return { agent: { id_agent: agent.id_agent }, token };
    } catch (error) {
        console.error("Error during login", error);
        throw new Error("Erreur interne");
    }
}

async function getAllAgents() {
    try {
        const { rows } = await pool.query("SELECT * FROM agents");
        return rows;
    } catch (error) {
        console.error("Error during getAllAgent", error);
        throw error;    
    }
}

async function getAgentById(id_agent) {
    try {
        const { rows } = await pool.query(`
        SELECT * 
        FROM agents 
        JOIN possede ON agents.id_agent = possede.id_agent
        JOIN fonctions ON possede.id_fonction = fonctions.id_fonction 
        WHERE agents.id_agent = $1`, [id_agent]);
        return rows[0];
    } catch (error) {
        console.error("Error during getagentById", error);
        throw error;
    }
}

// async function getAgentById(id_agent) {
//     try {
//         const { rows } = await pool.query(`
//         SELECT agents.id_agent, agents.nom_agent, agents.login_agent, agents.email_agent, agents.password_agent, agents.id_service, fonctions.id_fonction, fonctions.nom_fonction
//         FROM agents 
//         LEFT JOIN services ON agents.id_service = services.id_service
//         JOIN possede ON agents.id_agent = possede.id_agent
//         JOIN fonctions ON possede.id_fonction = fonctions.id_fonction 
//         WHERE agents.id_agent = $1`, [id_agent]);
// 
//         if (rows.length === 0) {
//             throw new Error('No agent found with the given ID');
//         }
// 
//         const agentInfo = {
//             id_agent: rows[0].id_agent,
//             nom_agent: rows[0].nom_agent,
//             login_agent: rows[0].login_agent,
//             email_agent: rows[0].email_agent,
//             password_agent: rows[0].password_agent,
//             id_service: rows[0].id_service,
//             fonctions: rows.map(row => ({
//                 id_fonction: row.id_fonction,
//                 nom_fonction: row.nom_fonction
//             }))
//         };
// 
//         return agentInfo;
//     } catch (error) {
//         console.error("Error during getAgentById", error);
//         throw error;
//     }
// }

async function getServicesByDga(id_dga) {
    try {
        const { rows } = await pool.query(`
        SELECT agents.id_agent, agents.nom_agent , services.*
        FROM agents
        JOIN services ON agents.id_agent = services.id_dga
        WHERE agents.id_agent = $1`, [id_dga]);
        return rows;
    } catch (error) {
        console.error("Error during getagentById", error);
        throw error;
    }
}
async function getServicesByDgs(id_dgs) {
    try {
        const { rows } = await pool.query(`
        SELECT 
            services.id_service, 
            services.nom_service, 
            services.sigle
        FROM 
            services
        JOIN 
            dgsdga ON services.id_dga = dgsdga.id_dga
        JOIN 
            agents ON dgsdga.id_dgs = agents.id_agent
        WHERE 
            agents.id_agent = $1
        `, [id_dgs]);
        return rows;
    } catch (error) {
        console.error("Error during getagentById", error);
        throw error;
    }
}

async function getServiceDga(id_dga, id_service) {
    try {
        const { rows } = await pool.query(`
        SELECT agents.id_agent, agents.nom_agent , services.*
        FROM agents
        JOIN services ON agents.id_agent = services.id_dga
        WHERE agents.id_agent = $1 AND services.id_service = $2`, [id_dga, id_service]);
        return rows[0];
    } catch (error) {
        console.error("Error during getagentById", error);
        throw error;
    }
}

async function createAgent(nom_agent, login_agent, email_agent, password_agent, id_service) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO agents (nom_agent, login_agent, email_agent, password_agent, id_service) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nom_agent, login_agent, email_agent, password_agent, id_service]
        );
        return rows[0].id_agent;
    } catch (error) {
        console.error("Error during createAgent", error);
        throw error;
    }
}

async function deleteAgent(id_agent) {
    try {
        await pool.query("DELETE FROM agents WHERE id_agent = $1", [id_agent]);
    } catch (error) {
        console.error("Error during deleteAgent", error);
        throw error;
    }
}

async function updateAgent(id_agent, nom_agent, login_agent, email_agent, password_agent, id_service) {
    try {
        await pool.query(
            "UPDATE agents SET nom_agent = $1, login_agent = $2, email_agent = $3, password_agent = $4, id_service = $5 WHERE id_agent = $6",
            [nom_agent, login_agent, email_agent, password_agent, id_service, id_agent]
        );
        return await getAgentById(id_agent);
    } catch (error) {
        console.error("Error during updateAgent", error);
        throw error;
    }
}

module.exports = {
    loginAgent,
    getAllAgents,
    getAgentById,
    getServicesByDga,
    getServicesByDgs,
    getServiceDga,
    createAgent,
    deleteAgent,
    updateAgent,
};
