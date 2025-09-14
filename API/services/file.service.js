const pool = require('../config/db');
const fs = require('fs');
const path = require('path');

async function createFileDemande(nom_file, upload_date, nom_file_2, filePath, id_demande) {
    try {
        const { rows } = await pool.query(
            "INSERT INTO file_upload (nom_file, upload_date, nom_file_2, filePath, id_demande) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nom_file, upload_date, nom_file_2, filePath, id_demande]
        );
        return rows[0].id_file;
    } catch (error) {
        console.error("Error during createFileDemande", error);
        throw error;
    }
}

async function updateFile(id_file, nom_file, upload_date, nom_file_2, filePath, id_demande) {
    try {
        const { rows } = await pool.query(
            "UPDATE file_upload SET nom_file = $1, upload_date = $2, nom_file_2 = $3, filePath = $4, id_demande = $5 WHERE id_file = $6",
            [nom_file, upload_date, nom_file_2, filePath, id_demande, id_file]
        );
        return rows[0];
    } catch (error) {
        console.error("Error during updateFile", error);
        throw error;
    }
}

// Supprimer le lien de la table du fichier à la demande
async function deleteFileLine(id_file) {
    try {
        await pool.query("DELETE FROM file_upload WHERE id_file = $1", [id_file]);
        
    } catch (error) {
        console.error("Error during deleteFile", error);
        throw error;
    }
}

// Supprimer les fichiers d'une demande et le dossier et le lien de la base de données
async function deleteFilesDemande(id_demande) {
    try {
        // Récupérer tous les fichiers de la demande
        const { rows } = await pool.query("SELECT filePath FROM file_upload WHERE id_demande = $1", [id_demande]);
        const folderPath = path.join(__dirname, '..', 'uploads', id_demande.toString());

        // Supprimer les entrées de la base de données
        await pool.query("DELETE FROM file_upload WHERE id_demande = $1", [id_demande]);
        
        if (fs.existsSync(folderPath)) {
            // Supprimer le dossier de la demande
            fs.rm(folderPath, { recursive: true }, (err) => {
                if (err) {
                    console.error("Error deleting folder:", err);
                }
            });
        }

        if (rows.length > 0) {
            // Supprimer chaque fichier
            rows.forEach(row => {
                const filePath = row.filepath;
                if (filePath) {
                    const fullPath = path.join(__dirname, '..', filePath);
                    fs.unlink(fullPath, (err) => {
                        if (err) {
                            console.error("Error deleting file:", err);
                        }
                    });
                } else {
                    console.error("File path is undefined for id_demande:", id_demande);
                    throw new Error("File path is undefined");
                }
            });

        } else {
            return null
        }
    } catch (error) {
        console.error("Error during deleteFilesDemande", error);
        throw error;
    }
}

// Supprimer un fichier d'une demande
async function deleteFile(id_file) {
    try {
        const { rows } = await pool.query("SELECT filePath FROM file_upload WHERE id_file = $1", [id_file]);
        if (rows.length > 0) {
            const filePath = rows[0].filepath;
            await pool.query("DELETE FROM file_upload WHERE id_file = $1", [id_file]);

            if (filePath) {

                // Supprimer le fichier physique
                const fullPath = path.join(__dirname, '..', filePath);
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error("Error deleting file:", err);
                    }
                });
            } else {
                console.error("File path is undefined for id_file:", id_file);
                throw new Error("File path is undefined");
            }
        } else {
            console.error("No entry found for id_file:", id_file);
            throw new Error("No entry found for id_file");
        }
    } catch (error) {
        console.error("Error during deleteFile", error);
        throw error;
    }
}


async function getAllFiles() {
    try {
        const { rows } = await pool.query("SELECT * FROM file_upload");
        return rows;
    } catch (error) {
        console.error("Error during getAllFiles", error);
        throw error;    
    }
}

async function getFilesByIdDemande(id_demande) {
    try {
        const { rows } = await pool.query("SELECT * FROM file_upload WHERE id_demande = $1 ", [id_demande]);
        return rows;
    } catch (error) {
        console.error("Error during getdemandeById", error);
        throw error;
    }
}

module.exports = {
    createFileDemande,
    updateFile,
    deleteFileLine,
    deleteFile,
    deleteFilesDemande,
    getAllFiles,
    getFilesByIdDemande
};