const express = require('express');
const router =express.Router();
const likesController = require('../controller/like_controller');

router.post('/toogle',likesController.toggleLike);

module.exports = router;