const express = require('express');
const { apiRequest } = require('../services/apiService');
const router = express.Router();

const PROFILES_BASE = () => (process.env.PROFILES_URL || '').replace(/\/+$/, '');
const QOD_BASE      = () => (process.env.QOD_URL      || '').replace(/\/+$/, '');

// GET /api/profiles/network  ->  GET {{ profiles_url }}/profiles
router.get('/network', async (req, res) => {
  try {
    const result = await apiRequest(`${PROFILES_BASE()}/profiles`, { method: 'GET' });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /api/profiles/network/:profileId  ->  GET {{ profiles_url }}/profiles/:profileId
router.get('/network/:profileId', async (req, res) => {
  try {
    const result = await apiRequest(`${PROFILES_BASE()}/profiles/${req.params.profileId}`, { method: 'GET' });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /api/profiles/qos  ->  POST {{ qod_url }}/retrieve-qos-profiles (no device filter = all profiles)
router.get('/qos', async (req, res) => {
  if (!QOD_BASE()) {
    return res.status(503).json({ error: 'QOD_URL is not configured in .env' });
  }
  try {
    const result = await apiRequest(`${QOD_BASE()}/retrieve-qos-profiles`, {
      method: 'POST',
      body: {}   // no device filter — returns all available profiles
    });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /api/profiles/qos/:name  ->  GET {{ qod_url }}/qos-profiles/:name
router.get('/qos/:name', async (req, res) => {
  if (!QOD_BASE()) {
    return res.status(503).json({ error: 'QOD_URL is not configured in .env' });
  }
  try {
    const result = await apiRequest(`${QOD_BASE()}/qos-profiles/${req.params.name}`, { method: 'GET' });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

module.exports = router;
