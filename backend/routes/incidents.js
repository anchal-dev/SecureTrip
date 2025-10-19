// routes/incidents.js
const express = require('express');
const router = express.Router();

// Placeholder for incident reporting
// We'll implement this in Phase 7

router.post('/', async (req, res) => {
  res.json({ message: 'Incident reporting coming soon' });
});

router.get('/', async (req, res) => {
  res.json({ incidents: [] });
});

module.exports = router;