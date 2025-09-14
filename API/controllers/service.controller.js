const serviceService = require("../services/service.service");


exports.createService = async (req, res) => {
    const { nom_service, sigle, id_dga } = req.body;
    try {
        const id_service = await serviceService.createService(nom_service, sigle, id_dga);
        res.status(201).json({ id_service: id_service, message: 'Service créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la service' });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await serviceService.getAllServices();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des services' });
    }
};

exports.getServiceById = async (req, res) => {
    const id_service = req.params.id;
    try {
        const service = await serviceService.getServiceById(id_service);
        if (!service) {
            res.status(404).json({ message: 'Service non trouvée' });
        } else {
            res.status(200).json(service);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la service' });
    }
};

exports.updateService = async (req, res) => {
    const id_service = req.params.id;
    const { nom_service, sigle, id_dga } = req.body;
    try {
        const updatedService = await serviceService.updateService(id_service, nom_service, sigle, id_dga);
        if (!updatedService) {
            res.status(404).json({ message: 'Service non trouvée' });
        } else {
            res.status(200).json(updatedService);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la service' });
    }
};

exports.deleteService = async (req, res) => {
    const id_service = req.params.id;
    try {
        await serviceService.deleteService(id_service);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la service' });
    }
};

exports.getServiceByAgentId = async (req, res) => {
    const agentId = req.params.agentId;
    try {
        const service = await serviceService.getServiceByAgentId(agentId);
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de l\'utilisateur' });
    }
};

exports.getAllServicesByDga = async (req, res) => {
    const id_dga = req.params.id_dga;
    try {
        const services = await serviceService.getAllServicesByDga(id_dga);
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de l\'utilisateur' });
    }
};