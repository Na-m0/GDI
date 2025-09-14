const express = require("express");
const router = express.Router();
const typeDemandeController = require('../controllers/type_demande.controller');
const errorHandler = require('../middlewares/type_demande.middleware');


router.post('/', typeDemandeController.createType);
router.get('/', typeDemandeController.getAllTypes);
router.get('/:id', typeDemandeController.getTypeById);
router.delete('/:id', typeDemandeController.deleteType);
router.put('/:id', typeDemandeController.updateType);

module.exports = router;
