const express = require('express');
const router = express.Router();
const { createBatch, getBatches, getBatchDetail } = require('../controllers/batchController');
const auth = require('../middleware/auth');

router.post('/', auth, createBatch);
router.get('/', auth, getBatches);
router.get('/:id', auth, getBatchDetail);

module.exports = router;