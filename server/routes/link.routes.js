const express = require('express');
const router = express.Router();
const {
  healthCheck,
  createLink,
  getAllLinks,
  getLink,
  deleteLink,
  redirectLink,
} = require('../controller/links.controller');

// Health check
router.get('/healthz', healthCheck);

// API Routes
router.post('/links', createLink);
router.get('/links', getAllLinks);
router.get('/links/:code', getLink);
router.delete('/links/:code', deleteLink);

router.get('/redirect/:code', redirectLink);

module.exports = router;