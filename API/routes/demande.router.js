const express = require("express");
const router = express.Router();
const demandeController = require('../controllers/demande.controller');
const errorHandler = require('../middlewares/demande.middleware');

router.post('/', demandeController.createDemande);
router.get('/', demandeController.getAllDemandes);
router.get('/:id', demandeController.getDemandeById);
router.get('/service/:serviceId', demandeController.getDemandesByServiceId);
router.get('/budget/:serviceId', demandeController.getSumBudgetByServiceId);
router.get('/budget/dga/:id_dga', demandeController.getSumBudgetByDgaId);
router.get('/status/:id_statut/:id_service', demandeController.getNombreDemandesByStatusAndService);
router.get('/status/dga/:id_statut/:id_dga', demandeController.getNombreDemandesByStatutAndDga);
router.get('/services/:id_dga', demandeController.getDemandesServicesDga);
router.get('/dgs/:id_dgs', demandeController.getDemandesDgs);
router.delete('/:id', demandeController.deleteDemande);
router.put('/:id', demandeController.updateDemande);
router.put('/status/:id_demande', demandeController.updateStatusDemande);
router.put('/motif/:id_demande', demandeController.updateMotifDemande);

module.exports = router;
