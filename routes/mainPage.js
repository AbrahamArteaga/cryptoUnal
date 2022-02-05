// Ruta /home

const express = require('express');
const router = express.Router();
const {renderHomepage} = require("../controllers/renderTemplate")
const { renderTransaction, renderProfile, renderNewEmail, renderNewPassword } = require('../controllers/renderTemplate')
const { doTransaction } = require('../controllers/transaction')
const { setNewEmail, setNewPassword } = require('../controllers/updateUser')


router.get('/', renderHomepage);
router.get('/transaction', renderTransaction);
router.post('/transaction', doTransaction);
router.get('/profile', renderProfile);
router.get('/newEmail', renderNewEmail);
router.post('/newEmail', setNewEmail);
router.get('/newPassword', renderNewPassword);
router.post('/newPassword', setNewPassword);



module.exports = router;