const { update_email, update_username } = require("../models/connectUserDb");
const Web3 = require('web3');


const setNewEmail = async (req, res) => { 
    const { newemail } = req.body;
    let result = await update_email(req.session.iduser, newemail);
    res.send('<script> alert("Email updated. Log-in again"); window.location.href = "/"; </script>');
}

const setNewUsername = async (req, res) => {
    const { newusername } = req.body;
    let result = await update_username(req.session.iduser, newusername);
    res.send('<script> alert("Username updated. Log-in again"); window.location.href = "/"; </script>');
 }

module.exports = { setNewEmail, setNewUsername }