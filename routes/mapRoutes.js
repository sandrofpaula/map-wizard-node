const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');

router.get('/', mapController.index);
router.get('/view/:id', mapController.view);
router.route('/create').get(mapController.create).post(mapController.create);
router.route('/edit/:id').get(mapController.edit).post(mapController.edit);
router.get('/delete/:id', mapController.delete);
router.route('/editApiKey').get(mapController.editApiKey).post(mapController.editApiKey);

module.exports = router;
