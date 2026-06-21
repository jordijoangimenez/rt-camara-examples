const express = require('express');
const { storeNotification, getNotifications, clearNotifications } = require('../services/webhookService');
const router = express.Router();

// Generic handler - CAMARA APIs POST to /webhooks/:resource
// e.g. /webhooks/networks, /webhooks/accesses, /webhooks/sessions
router.post('/:resource', (req, res) => {
  const entry = storeNotification(req.params.resource, req.body);
  // Acknowledge receipt immediately (CAMARA expects 200/204)
  res.status(200).json({ received: true, id: entry.id });
});

// Frontend polls this to see incoming notifications
// GET /api/webhooks/notifications?source=networks
router.get('/notifications', (req, res) => {
  const notifications = getNotifications(req.query.source || null);
  res.json(notifications);
});

// DELETE /api/webhooks/notifications - clear all
router.delete('/notifications', (req, res) => {
  clearNotifications();
  res.json({ cleared: true });
});

module.exports = router;
