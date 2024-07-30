// roleRoutes.js
const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/admin', authenticate, authorize(['admin']), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin' });
});

router.get('/user', authenticate, authorize(['user', 'admin']), (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.role}` });
});

module.exports = router;
