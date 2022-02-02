const express = require('express');
const router = express.Router();
const {renderLogin , renderRegister } = require('../controllers/renderTemplate')
const {getUserLogin, registerUser} = require('../controllers/loginRegisterPost')
// const {signTransaction} = require('../controllers/transaction')

router.get('/', renderLogin);
router.post('/', getUserLogin);
router.get('/register', renderRegister);
router.post('/register', registerUser, renderRegister);

// router.get('/transaction', (req, res) => {
//     res.render('transaction', {
//     title: 'Transactions'
//     })
// });

// router.post('/transaction', async(req, res, next) => {
//     const {sender, senderkey, recipient, amount } = req.body;
//     await signTransaction(sender, senderkey, recipient, amount);    
// });


module.exports = router;