const express = require("express");
const router = express.Router();
const prioriteController = require('../controllers/priorite.controller');
const errorHandler = require('../middlewares/priorite.middleware');


router.post('/', prioriteController.createPriorite);
router.get('/', prioriteController.getAllPriorites);
router.get('/:id', prioriteController.getPrioriteById);
router.delete('/:id', prioriteController.deletePriorite);
router.put('/:id', prioriteController.updatePriorite);

module.exports = router;
