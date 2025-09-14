const express = require("express");
const router = express.Router();
const statusController = require('../controllers/status.controller');
const errorHandler = require('../middlewares/status.middleware');


router.post('/', statusController.createStatus);
router.get('/', statusController.getAllStatus);
router.get('/:id', statusController.getStatusById);
router.delete('/:id', statusController.deleteStatus);
router.put('/:id', statusController.updateStatus);

module.exports = router;
