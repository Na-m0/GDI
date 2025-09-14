const express = require("express");
const router = express.Router();
const traitementController = require('../controllers/traitement.controller');
const errorHandler = require('../middlewares/traitement.middleware');


router.post('/', traitementController.createTraitement);
router.get('/', traitementController.getAllTraitements);
router.get('/:id', traitementController.getTraitementById);
router.delete('/:id', traitementController.deleteTraitement);
router.put('/:id', traitementController.updateTraitement);

module.exports = router;
