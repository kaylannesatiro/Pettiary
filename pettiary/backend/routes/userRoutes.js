const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rotas de usuário
router.get('/profile/:id?', userController.getProfile);
router.put('/profile/:id?', userController.updateProfile);
router.put('/password/:id?', userController.changePassword);

module.exports = router;
