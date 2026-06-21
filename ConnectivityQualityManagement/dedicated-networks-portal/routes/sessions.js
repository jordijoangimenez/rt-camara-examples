const express = require('express');
const { apiRequest } = require('../services/apiService');
const { sinkUrl } = require('../services/webhookService');
const router = express.Router();

const BASE = () => process.env.QOD_URL;

// POST /api/sessions
router.post('/', async (req, res) => {
  try {
    const body = { ...req.body };
    const sink = req.body.sink || sinkUrl('sessions');
    if (sink) body.sink = sink;
    const result = await apiRequest(`${BASE()}/sessions`, {
      method: 'POST',
      body
    });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /api/sessions/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const result = await apiRequest(`${BASE()}/sessions/${req.params.sessionId}`, {
      method: 'GET'
    });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// DELETE /api/sessions/:sessionId
router.delete('/:sessionId', async (req, res) => {
  try {
    const result = await apiRequest(`${BASE()}/sessions/${req.params.sessionId}`, {
      method: 'DELETE'
    });
    res.status(result.status).json(result.data || {});
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// POST /api/sessions/:sessionId/extend
router.post('/:sessionId/extend', async (req, res) => {
  try {
    const result = await apiRequest(`${BASE()}/sessions/${req.params.sessionId}/extend`, {
      method: 'POST',
      body: req.body
    });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// POST /api/sessions/retrieve  -> POST /retrieve-sessions
router.post('/retrieve', async (req, res) => {
  try {
    const result = await apiRequest(`${BASE()}/retrieve-sessions`, {
      method: 'POST',
      body: req.body
    });
    res.status(result.status).json(result.data);
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

module.exports = router;
