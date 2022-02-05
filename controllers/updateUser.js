const { update_email, update_password } = require("../models/connectUserDb");
const Web3 = require('web3');


const setNewEmail = async (req, res) => { 
    const { newemail } = req.body;
    let result = await update_email(req.session.iduser, newemail);
    res.send('<script> alert("Email updated. Log-in again"); window.location.href = "/"; </script>');
}

const setNewPassword = async (req, res) => {
    console.log(web3.eth.accounts.wallet[0])
    /*const { newpassword } = req.body;
    let wallet = web3.eth.accounts.encrypt(req.session.cartera, newpassword);
    let result = await update_password(req.session.iduser, newpassword, wallet);
    */
 }

module.exports = { setNewEmail, setNewPassword }