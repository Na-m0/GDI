const typeDemandeService = require("../services/type_demande.service");


exports.createType = async (req, res) => {
    const { nom_type } = req.body;
    try {
        const id_type = await typeDemandeService.createType(nom_type);
        res.status(201).json({ id_type: id_type, message: 'Type créé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création du type' });
    }
};

exports.getAllTypes = async (req, res) => {
    try {
        const types = await typeDemandeService.getAllTypes();
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des types' });
    }
};

exports.getTypeById = async (req, res) => {
    const id_type = req.params.id;
    try {
        const type = await typeDemandeService.getTypeById(id_type);
        if (!type) {
            res.status(404).json({ message: 'Type non trouvée' });
        } else {
            res.status(200).json(type);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du type' });
    }
};

exports.updateType = async (req, res) => {
    const id_type = req.params.id;
    const { nom_type } = req.body;
    try {
        const updatedType = await typeDemandeService.updateType(id_type, nom_type);
        if (!updatedType) {
            res.status(404).json({ message: 'Type non trouvée' });
        } else {
            res.status(200).json(updatedType);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du type' });
    }
};

exports.deleteType = async (req, res) => {
    const id_type = req.params.id;
    try {
        await typeDemandeService.deleteType(id_type);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du type' });
    }
};
