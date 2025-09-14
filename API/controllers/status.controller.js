const statusService = require("../services/status.service");


exports.createStatus = async (req, res) => {
    const { nom_status } = req.body;
    try {
        const statusId = await statusService.createStatus(nom_status);
        res.status(201).json({ id_status: statusId, message: 'Status créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du status' });
    }
};

exports.getAllStatus = async (req, res) => {
    try {
        const status = await statusService.getAllStatus();
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des status' });
    }
};

exports.getStatusById = async (req, res) => {
    const id_status = req.params.id;
    try {
        const status = await statusService.getStatusById(id_status);
        if (!status) {
            res.status(404).json({ message: 'Status non trouvée' });
        } else {
            res.status(200).json(status);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du status' });
    }
};

exports.updateStatus = async (req, res) => {
    const id_status = req.params.id;
    const { nom_status } = req.body;
    try {
        const updatedStatus = await statusService.updateStatus(id_status, nom_status);
        if (!updatedStatus) {
            res.status(404).json({ message: 'Status non trouvée' });
        } else {
            res.status(200).json(updatedStatus);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du status' });
    }
};

exports.deleteStatus = async (req, res) => {
    const id_status = req.params.id;
    try {
        await statusService.deleteStatus(id_status);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du status' });
    }
};
