const express = require("express");
const router = express.Router();
const fileController = require('../controllers/file.controller');

router.post('/', fileController.createFileDemande);
router.put('/:id_file', fileController.updateFile);
router.delete('/:id_file', fileController.deleteFileLine);
router.delete('/uploads/:id_file', fileController.deleteFile);
router.delete('/demande/:id_demande', fileController.deleteFilesDemande);
router.get('/', fileController.getAllFiles);
router.get('/:id_demande', fileController.getFilesByIdDemande);

module.exports = router;
