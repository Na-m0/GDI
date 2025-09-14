const express = require("express");
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const errorHandler = require('../middlewares/service.middleware');


router.post('/', serviceController.createService);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.get('/agent/:agentId', serviceController.getServiceByAgentId);
router.get('/dga/:id_dga', serviceController.getAllServicesByDga);
router.delete('/:id', serviceController.deleteService);
router.put('/:id', serviceController.updateService);

module.exports = router;
