const traitementService = require("../services/traitement.service");


exports.createTraitement = async (req, res) => {
    const { avis_sicig, date_avis, id_demande } = req.body;
    try {
        const id_traitement = await traitementService.createTraitement(avis_sicig, date_avis, id_demande);
        res.status(201).json({ id_traitement: id_traitement, message: 'Traitement créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la traitement' });
    }
};

exports.getAllTraitements = async (req, res) => {
    try {
        const traitements = await traitementService.getAllTraitements();
        res.status(200).json(traitements);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des traitements' });
    }
};

exports.getTraitementById = async (req, res) => {
    const id_traitement = req.params.id;
    try {
        const traitement = await traitementService.getTraitementById(id_traitement);
        if (!traitement) {
            res.status(404).json({ message: 'Traitement non trouvée' });
        } else {
            res.status(200).json(traitement);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la traitement' });
    }
};

exports.updateTraitement = async (req, res) => {
    const id_traitement = req.params.id;
    const { avis_sicig, date_avis, id_demande } = req.body;
    try {
        const updatedTraitement = await traitementService.updateTraitement(id_traitement, avis_sicig, date_avis, id_demande);
        if (!updatedTraitement) {
            res.status(404).json({ message: 'Traitement non trouvée' });
        } else {
            res.status(200).json(updatedTraitement);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la traitement' });
    }
};

exports.deleteTraitement = async (req, res) => {
    const id_traitement = req.params.id;
    try {
        await traitementService.deleteTraitement(id_traitement);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la traitement' });
    }
};
