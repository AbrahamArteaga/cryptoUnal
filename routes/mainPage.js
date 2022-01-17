const express = require('express');
const router = express.Router();
const {renderHomepage} = require("../controllers/renderTemplate")
const { renderTransaction } = require('../controllers/renderTemplate')
const { doTransaction } = require('../controllers/transaction')

router.get('/', renderHomepage);
router.get('/transaction', renderTransaction);
router.post('/transaction', doTransaction);

module.exports = router;