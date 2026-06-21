const express = require('express');
const { apiRequest } = require('../services/apiService');
const { sinkUrl } = require('../services/webhookService');
const router = express.Router();

const BASE = () => process.env.NETWORKS_URL;

// GET /api/networks
router.get('/', async (req, res) => {
  try {
    const url = new URL(`${BASE()}/networks`);
    if (req.query.name) url.searchParams.set('name', req.query.name);
    const result = await apiRequest(url.toString(), { method: 'GET' });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// POST /api/networks  — automatically injects sink URL
router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    const sink = req.body.sink || sinkUrl('networks');
    if (sink) body.sink = sink;
    const result = await apiRequest(`${BASE()}/networks`, {
      method: 'POST',
      body
    });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /api/networks/:networkId
router.get('/:networkId', async (req, res) => {
  try {
    const result = await apiRequest(`${BASE()}/networks/${req.params.networkId}`, {
      method: 'GET'
    });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// DELETE /api/networks/:networkId
router.delete('/:networkId', async (req, res) => {
  try {
    const result = await apiRequest(`${BASE()}/networks/${req.params.networkId}`, {
      method: 'DELETE'
    });
    res.status(result.status).json(result.data || {});
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

module.exports = router;
