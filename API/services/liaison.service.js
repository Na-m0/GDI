const pool = require('../config/db');


// TABLE possede
// --------------------------------------------------------------------------------------------

async function getAllPossede() {
    try {
        const { rows } = await pool.query("SELECT * FROM possede");
        return rows;
    } catch (error) {
        console.error("Error during getAllPossede", error);
        throw error;    
    }
}

async function addFonctionToAgent(id_fonction, id_agent) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO possede (id_fonction, id_agent) VALUES ($1,$2) RETURNING *",
            [id_fonction, id_agent]
        );
        return rows[0];
    } catch (error) {
        console.error("Error during addFonctionToAgent", error);
        throw error;
    }
}

async function deleteFonctionToAgent(id_fonction, id_agent) {
    try {
        const query = 'DELETE FROM possede WHERE id_fonction = $1 AND id_agent = $2 RETURNING *';
        const { rows } = await pool.query(query, [id_fonction, id_agent]);
        return rows[0];
    } catch (error) {
        console.error('Error during deleteFonctionToAgent', error);
        throw error;
    }
}


// TABLE dgsdga
// --------------------------------------------------------------------------------------------

async function getAllDgsdga() {
    try {
        const { rows } = await pool.query("SELECT * FROM dgsdga");
        return rows;
    } catch (error) {
        console.error("Error during getAllDgsdga", error);
        throw error;    
    }
}

async function addDgsdga(id_dgs, id_dga) {
    try {
        const { rows: dgsRows } = await pool.query(
            "SELECT id_agent FROM possede WHERE id_fonction = 4 AND id_agent = $1",
            [id_dgs]
        );
        const { rows: dgaRows } = await pool.query(
            "SELECT id_agent FROM possede WHERE id_fonction IN (3, 4) AND id_agent = $1",
            [id_dga]
        );

        if (dgsRows.length > 0 && dgaRows.length > 0) {
            const { rows } = await pool.query(
                "INSERT INTO dgsdga (id_dgs, id_dga) VALUES ($1, $2) RETURNING *",
                [id_dgs, id_dga]
            );
            
            return rows[0];
        } else {
            console.log("Les agents ne remplissent pas les conditions requises.");
        }
    } catch (error) {
        console.error("Error during addDgsdga", error);
        throw error;
    }
}

async function deleteDgsdga(id_dgs, id_dga) {
    try {
        const query = 'DELETE FROM dgsdga WHERE id_dgs = $1 AND id_dga = $2 RETURNING *';
        const { rows } = await pool.query(query, [id_dgs, id_dga]);
        return rows[0];
    } catch (error) {
        console.error('Error during deleteDgsdga', error);
        throw error;
    }
}



module.exports = {
    getAllPossede,
    addFonctionToAgent,
    deleteFonctionToAgent,
    getAllDgsdga,
    addDgsdga,
    deleteDgsdga
};