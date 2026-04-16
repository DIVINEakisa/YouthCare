const express = require('express');
const { updateCycleTracker, getCycleTracker } = require('../controllers/cycleTrackerController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/update', auth, updateCycleTracker);
router.get('/get', auth, getCycleTracker);

module.exports = router;
