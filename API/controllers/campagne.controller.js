const campagneService = require("../services/campagne.service");


exports.createCampagne = async (req, res) => {
    const { nom_campagne, description, date_debut, date_fin, date_creation, id_status } = req.body;
    try {
        const id_campagne = await campagneService.createCampagne(nom_campagne, description, date_debut, date_fin, date_creation, id_status);
        res.status(201).json({ id_campagne: id_campagne, message: 'Campagne créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la campagne' });
    }
};

exports.getAllCampagnes = async (req, res) => {
    try {
        const campagnes = await campagneService.getAllCampagnes();
        res.status(200).json(campagnes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des campagnes' });
    }
};

exports.getCampagneById = async (req, res) => {
    const id_campagne = req.params.id;
    try {
        const campagne = await campagneService.getCampagneById(id_campagne);
        if (!campagne) {
            res.status(404).json({ message: 'Campagne non trouvée' });
        } else {
            res.status(200).json(campagne);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la campagne' });
    }
};

exports.updateCampagne = async (req, res) => {
    const id_campagne = req.params.id;
    const { nom_campagne, description, date_debut, date_fin, date_creation, id_status } = req.body;
    try {
        const updatedCampagne = await campagneService.updateCampagne(id_campagne, nom_campagne, description, date_debut, date_fin, date_creation, id_status);
        if (!updatedCampagne) {
            res.status(404).json({ message: 'Campagne non trouvée' });
        } else {
            res.status(200).json(updatedCampagne);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la campagne' });
    }
};

exports.deleteCampagne = async (req, res) => {
    const id_campagne = req.params.id;
    try {
        await campagneService.deleteCampagne(id_campagne);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la campagne' });
    }
};
