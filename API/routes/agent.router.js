const express = require("express");
const router = express.Router();
const agentController = require('../controllers/agent.controller');
const errorHandler = require('../middlewares/agent.middleware');


router.post('/', agentController.createAgent);
router.get('/', agentController.getAllAgents);
router.get('/:id', agentController.getAgentById);
router.get('/services/:id_dga', agentController.getServicesByDga);
router.get('/services/dgs/:id_dgs', agentController.getServicesByDgs);
router.get('/service/:id_dga/:id_service', agentController.getServiceDga);
router.put('/:id', agentController.updateAgent);
router.post('/login', errorHandler.validateLogin, agentController.loginAgent);
router.delete('/:id', agentController.deleteAgent);

module.exports = router;
