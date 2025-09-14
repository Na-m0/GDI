const express = require("express");
const router = express.Router();
const liaisonController = require('../controllers/liaison.controller');
const errorHandler = require('../middlewares/liaison.middleware');


router.get('/fonctionAgent', liaisonController.getAllPossede);
router.post('/fonctionAgent', liaisonController.addFonctionToAgent);
router.delete('/fonctionAgent/:id_fonction/:id_agent', liaisonController.deleteFonctionToAgent);

router.get('/dgsdga', liaisonController.getAllDgsdga);
router.post('/dgsdga', liaisonController.addDgsdga);
router.delete('/dgsdga/:id_dgs/:id_dga', liaisonController.deleteDgsdga);


module.exports = router;
