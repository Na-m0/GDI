const liaisonService = require("../services/liaison.service");

// TABLE possede
// --------------------------------------------------------------------------------------------
exports.getAllPossede = async (req, res) => {
    try {
        const fonctions = await liaisonService.getAllPossede();
        res.status(200).json(fonctions);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des fonctions' });
    }
};

exports.addFonctionToAgent = async (req, res) => {
    const { id_fonction, id_agent } = req.body;
    try {
        const fonction = await liaisonService.addFonctionToAgent(id_fonction, id_agent);
        res.status(201).json({ fonction, message: 'Fonction créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la fonction' });
    }
};

exports.deleteFonctionToAgent = async (req, res) => {
    const { id_fonction, id_agent } = req.params;
    try {
        const deletedLiaison = await liaisonService.deleteFonctionToAgent(id_fonction, id_agent);

        if (!deletedLiaison) {
            return res.status(404).send('Relation not found');
        }

        res.status(200).json(deletedLiaison);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal error');
    }
};

// TABLE dgsdga
// --------------------------------------------------------------------------------------------
exports.getAllDgsdga = async (req, res) => {
    try {
        const fonctions = await liaisonService.getAllDgsdga();
        res.status(200).json(fonctions);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des fonctions' });
    }
};

exports.addDgsdga = async (req, res) => {
    const { id_dgs, id_dga } = req.body;
    try {
        const fonction = await liaisonService.addDgsdga(id_dgs, id_dga);
        res.status(201).json({ fonction, message: 'Fonction créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la fonction' });
    }
};

exports.deleteDgsdga = async (req, res) => {
    const { id_dgs, id_dga } = req.params;
    try {
        const deletedLiaison = await liaisonService.deleteDgsdga(id_dgs, id_dga);

        if (!deletedLiaison) {
            return res.status(404).send('Relation not found');
        }

        res.status(200).json(deletedLiaison);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal error');
    }
};
