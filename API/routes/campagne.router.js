const express = require("express");
const router = express.Router();
const campagneController = require('../controllers/campagne.controller');
const errorHandler = require('../middlewares/campagne.middleware');


router.post('/', campagneController.createCampagne);
router.get('/', campagneController.getAllCampagnes);
router.get('/:id', campagneController.getCampagneById);
router.delete('/:id', campagneController.deleteCampagne);
router.put('/:id', campagneController.updateCampagne);

module.exports = router;
