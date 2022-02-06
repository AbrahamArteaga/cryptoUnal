// Ruta /home

const express = require('express');
const router = express.Router();
const {renderHomepage} = require("../controllers/renderTemplate")
const { renderTransaction, renderProfile, renderNewEmail, renderNewUsername } = require('../controllers/renderTemplate')
const { doTransaction } = require('../controllers/transaction')
const { setNewEmail, setNewUsername } = require('../controllers/updateUser')


router.get('/', renderHomepage);
router.get('/transaction', renderTransaction);
router.post('/transaction', doTransaction);
router.get('/profile', renderProfile);
router.get('/newEmail', renderNewEmail);
router.post('/newEmail', setNewEmail);
router.get('/newUsername', renderNewUsername);
router.post('/newUsername', setNewUsername);



module.exports = router;