const fileService = require("../services/file.service");


exports.createFileDemande = async (req, res) => {
    const {nom_file, upload_date, nom_file_2, filePath, id_demande } = req.body;
    try {
        const id_file = await fileService.createFileDemande(nom_file, upload_date, nom_file_2, filePath, id_demande);
        res.status(201).json({ id_file: id_file, message: 'Demande créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la demande' });
    }
};

exports.updateFile = async (req, res) => {
    const id_file = req.params.id_file;
    const { nom_file, upload_date, nom_file_2, filePath, id_demande } = req.body;
    try {
        const updatedFile = await fileService.updateFile(id_file, nom_file, upload_date, nom_file_2, filePath, id_demande);
        res.status(200).json(updatedFile);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la demande' });
    }
};

exports.deleteFileLine = async (req, res) => {
    const id_file = req.params.id_file;
    try {
        await fileService.deleteFileLine(id_file);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la demande' });
    }
};

exports.deleteFile = async (req, res) => {
    const id_file = req.params.id_file;
    try {
        await fileService.deleteFile(id_file);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la demande' });
    }
};

exports.deleteFilesDemande = async (req, res) => {
    const id_demande = req.params.id_demande;
    try {
        await fileService.deleteFilesDemande(id_demande);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la demande' });
    }
};

exports.getAllFiles = async (req, res) => {
    try {
        const files = await fileService.getAllFiles();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes' });
    }
};

exports.getFilesByIdDemande = async (req, res) => {
    const id_demande = req.params.id_demande;
    try {
        const demande = await fileService.getFilesByIdDemande(id_demande);
        res.status(200).json(demande);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la demande' });
    }
};
