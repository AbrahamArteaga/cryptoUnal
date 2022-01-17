const { render } = require('express/lib/response');
<<<<<<< HEAD
const { getBalance } = require('../utils/getBalance')
=======
const { getBalanceETH } = require('../utils/getBalance')

>>>>>>> 9766b5186a372ea507b9586497fe560469577e37

const renderLogin = (req, res) => {
    req.session.destroy();
    console.log(req.session);
    res.render('index', {
        title: `Welcome to cryptoUNAL`
    })
}

const renderRegister = (req, res) => {
    res.render('register', {
        title: `User registration`,
        confirmationError: "true",
        emailError: "false"
    })
}

const renderTransaction = (req, res) => {
    res.render('transaction', {
    title: 'Transactions'
    })
}

<<<<<<< HEAD
const renderHomepage = (req, res) => {
        if (req.query.authenticated === 'true' && req.session.iduser){        
            console.log(req.session);
        res.render('home' , {            
=======
const renderHomepage = (req, res, user) => {
    if (req.query.authenticated === 'true' && req.session.iduser){
        res.render('home', {
            balance: getBalanceETH(req.session.publicKey),
>>>>>>> 9766b5186a372ea507b9586497fe560469577e37
            title: 'Welcome',            
            name: req.session.username,
            balance:  req.session.balance
        })        
    }
    else{
        res.send('<script> alert("The user does not exist or you entered a wrong password"); window.location.href = "/"; </script>');  
    }
    
}

module.exports = {renderLogin, renderRegister, renderTransaction, renderHomepage}