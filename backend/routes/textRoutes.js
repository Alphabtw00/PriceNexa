const express = require('express');
const router = express.Router();
const { getTexts } = require('../controllers/textController');

router.get('/:page/:language', getTexts);

module.exports = router;