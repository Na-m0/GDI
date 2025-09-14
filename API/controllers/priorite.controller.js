const prioriteService = require("../services/priorite.service");


exports.createPriorite = async (req, res) => {
    const { nom_priorite } = req.body;
    try {
        const id_priorite = await prioriteService.createPriorite(nom_priorite);
        res.status(201).json({ id_priorite: id_priorite, message: 'Priorite créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la priorite' });
    }
};

exports.getAllPriorites = async (req, res) => {
    try {
        const priorites = await prioriteService.getAllPriorites();
        res.status(200).json(priorites);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des priorites' });
    }
};

exports.getPrioriteById = async (req, res) => {
    const id_priorite = req.params.id;
    try {
        const priorite = await prioriteService.getPrioriteById(id_priorite);
        if (!priorite) {
            res.status(404).json({ message: 'Priorite non trouvée' });
        } else {
            res.status(200).json(priorite);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la priorite' });
    }
};

exports.updatePriorite = async (req, res) => {
    const id_priorite = req.params.id;
    const { nom_priorite } = req.body;
    try {
        const updatedPriorite = await prioriteService.updatePriorite(id_priorite, nom_priorite);
        if (!updatedPriorite) {
            res.status(404).json({ message: 'Priorite non trouvée' });
        } else {
            res.status(200).json(updatedPriorite);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la priorite' });
    }
};

exports.deletePriorite = async (req, res) => {
    const id_priorite = req.params.id;
    try {
        await prioriteService.deletePriorite(id_priorite);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la priorite' });
    }
};
