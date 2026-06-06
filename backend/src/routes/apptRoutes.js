const express = require('express');
const router = express.Router();
const ApptController = require('../controllers/apptController');

router.get('/', ApptController.getAll);
router.post('/', ApptController.create);
router.put('/:id', ApptController.update);
router.delete('/:id', ApptController.delete);

module.exports = router;
