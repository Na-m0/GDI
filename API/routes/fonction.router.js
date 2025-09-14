const express = require("express");
const router = express.Router();
const fonctionController = require('../controllers/fonction.controller');
const errorHandler = require('../middlewares/fonction.middleware');


router.post('/', fonctionController.createFonction);
router.get('/', fonctionController.getAllFonctions);
router.get('/:id', fonctionController.getFonctionById);
router.delete('/:id', fonctionController.deleteFonction);
router.put('/:id', fonctionController.updateFonction);

module.exports = router;
