const demandeService = require("../services/demande.service");


exports.createDemande = async (req, res) => {
    const { objet, justificatif, cpu, budget_estimatif, date_creation, 
        transmition, date_transmission, date_limite_validation, id_service, id_priorite, 
        id_campagne, id_status, id_type, id_agent, avis_responsable, avis_dga, avis_dgs, avis_sicig, motif_responsable, motif_dga, motif_dgs, motif_sicig } = req.body;
    try {
        const id_demande = await demandeService.createDemande(objet, justificatif, cpu, 
            budget_estimatif, date_creation, transmition, date_transmission, date_limite_validation, 
            id_service, id_priorite, id_campagne, id_status, id_type, id_agent, avis_responsable, avis_dga, avis_dgs, avis_sicig, motif_responsable, motif_dga, motif_dgs, motif_sicig);
        res.status(201).json({ id_demande: id_demande, message: 'Demande créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la demande' });
    }
};

exports.getAllDemandes = async (req, res) => {
    try {
        const demandes = await demandeService.getAllDemandes();
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes' });
    }
};

exports.getDemandeById = async (req, res) => {
    const id_demande = req.params.id;
    try {
        const demande = await demandeService.getDemandeById(id_demande);
        if (!demande) {
            res.status(404).json({ message: 'Demande non trouvée' });
        } else {
            res.status(200).json(demande);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la demande' });
    }
};

exports.getDemandesServicesDga = async (req, res) => {
    const id_dga = req.params.id_dga;
    try {
        const demande = await demandeService.getDemandesServicesDga(id_dga);
        if (!demande) {
            res.status(404).json({ message: 'Demande non trouvée' });
        } else {
            res.status(200).json(demande);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la demande' });
    }
};

exports.updateDemande = async (req, res) => {
    const id_demande = req.params.id;
    const { objet, justificatif, cpu, budget_estimatif, date_creation, transmition, date_transmission, 
        date_limite_validation, id_service, id_priorite, id_campagne, id_status, id_type, id_agent, avis_responsable, avis_dga, avis_dgs, avis_sicig, motif_responsable, motif_dga, motif_dgs, motif_sicig } = req.body;
    try {
        const updatedDemande = await demandeService.updateDemande(id_demande, objet, justificatif, cpu, 
            budget_estimatif, date_creation, transmition, date_transmission, date_limite_validation, 
            id_service, id_priorite, id_campagne, id_status, id_type, id_agent, avis_responsable, avis_dga, avis_dgs, avis_sicig, motif_responsable, motif_dga, motif_dgs, motif_sicig);
        res.status(200).json(updatedDemande);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la demande' });
    }
};

exports.updateStatusDemande = async (req, res) => {
    const id_demande = req.params.id_demande;
    const { id_status } = req.body;
    try {
        await demandeService.updateDemandeStatus(id_demande, id_status);
        res.status(200).json({ message: 'Statut de la demande mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du statut de la demande' });
    }
};

exports.updateMotifDemande = async (req, res) => {
    const id_demande = req.params.id_demande;
    const { motif_responsable, motif_dga, motif_dgs, motif_sicig } = req.body;
    try {
        await demandeService.updateMotifDemande(id_demande, motif_responsable, motif_dga, motif_dgs, motif_sicig);
        res.status(200).json({ message: 'Statut de la demande mis à jour avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour du statut de la demande' });
    }
};

exports.deleteDemande = async (req, res) => {
    const id_demande = req.params.id;
    try {
        await demandeService.deleteDemande(id_demande);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la demande' });
    }
};

exports.getDemandesByServiceId = async (req, res) => {
    const serviceId = req.params.serviceId;
    try {
        const demandes = await demandeService.getDemandesByServiceId(serviceId);
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de l\'utilisateur' });
    }
};

exports.getSumBudgetByServiceId = async (req, res) => {
    const serviceId = req.params.serviceId;
    try {
        const demandes = await demandeService.getSumBudgetByServiceId(serviceId);
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de l\'utilisateur' });
    }
};

exports.getSumBudgetByDgaId = async (req, res) => {
    const id_dga = req.params.id_dga;
    try {
        const demandes = await demandeService.getSumBudgetByDgaId(id_dga);
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de l\'utilisateur' });
    }
};

exports.getNombreDemandesByStatusAndService = async (req, res) => {
    const id_statut = req.params.id_statut;
    const id_service = req.params.id_service;
    try {
        const demandes = await demandeService.getNombreDemandesByStatusAndService(id_statut,id_service);
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de l\'utilisateur' });
    }
};

exports.getNombreDemandesByStatutAndDga = async (req, res) => {
    const id_statut = req.params.id_statut;
    const id_dga = req.params.id_dga;
    try {
        const demandes = await demandeService.getNombreDemandesByStatutAndDga(id_statut,id_dga);
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de l\'utilisateur' });
    }
};

exports.getDemandesDgs = async (req, res) => {
    const id_dgs = req.params.id_dgs;
    try {
        const demandes = await demandeService.getDemandesDgs(id_dgs);
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des demandes de l\'utilisateur' });
    }
};

