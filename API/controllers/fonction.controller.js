const fonctionService = require("../services/fonction.service");


exports.createFonction = async (req, res) => {
    const { nom_fonction } = req.body;
    try {
        const id_fonction = await fonctionService.createFonction(nom_fonction);
        res.status(201).json({ id_fonction: id_fonction, message: 'Fonction créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la fonction' });
    }
};

exports.getAllFonctions = async (req, res) => {
    try {
        const fonctions = await fonctionService.getAllFonctions();
        res.status(200).json(fonctions);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des fonctions' });
    }
};

exports.getFonctionById = async (req, res) => {
    const id_fonction = req.params.id;
    try {
        const fonction = await fonctionService.getFonctionById(id_fonction);
        if (!fonction) {
            res.status(404).json({ message: 'Fonction non trouvée' });
        } else {
            res.status(200).json(fonction);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la fonction' });
    }
};

exports.updateFonction = async (req, res) => {
    const id_fonction = req.params.id;
    const { nom_fonction } = req.body;
    try {
        const updatedFonction = await fonctionService.updateFonction(id_fonction, nom_fonction);
        if (!updatedFonction) {
            res.status(404).json({ message: 'Fonction non trouvée' });
        } else {
            res.status(200).json(updatedFonction);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la fonction' });
    }
};

exports.deleteFonction = async (req, res) => {
    const id_fonction = req.params.id;
    try {
        await fonctionService.deleteFonction(id_fonction);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la fonction' });
    }
};
