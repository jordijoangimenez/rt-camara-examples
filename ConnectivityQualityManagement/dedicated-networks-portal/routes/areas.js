const express = require('express');
const { apiRequest } = require('../services/apiService');
const router = express.Router();

const BASE = () => process.env.AREAS_URL;

// POST /api/areas/retrieve  -> POST /retrieve-service-areas
router.post('/retrieve', async (req, res) => {
  try {
    const result = await apiRequest(`${BASE()}/retrieve-service-areas`, {
      method: 'POST',
      body: req.body
    });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /api/areas/:areaId  -> GET /areas/:areaId
router.get('/:areaId', async (req, res) => {
  try {
    const result = await apiRequest(`${BASE()}/areas/${req.params.areaId}`, {
      method: 'GET'
    });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

module.exports = router;
