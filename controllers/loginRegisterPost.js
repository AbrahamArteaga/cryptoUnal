const {verify_user, verify_email , add_user_db} = require('../models/connectUserDb');
const {createEthereumWallet} = require('../utils/createWallet')
const {decrypt_wallet} = require('../utils/decrypt_wallet')
<<<<<<< HEAD
const {consultBalance} = require('../utils/getBalance')
const {add_Wallet, get_Wallet} = require('../models/connectWalletDb')
=======
const { add_Wallet, get_Wallet } = require('../models/connectWalletDb')
>>>>>>> 9766b5186a372ea507b9586497fe560469577e37

// La función getUserLogin es asincrona y espera el resultado de la promesa de verify_user
const getUserLogin = async(req,res) => {
    const {email , password } = req.body;   
    let result = await verify_user(email,password);    
    if (result[0].length !== 0){ 
        req.session.username =  result[0][0].username;                
        req.session.iduser = result[0][0].iduser;        
        let cartera = await get_Wallet(req.session.iduser);
        cartera = cartera[0][0].wallet_address;        
        cartera = await decrypt_wallet(cartera, password);        
        req.session.publicKey = cartera[0].address;
        req.session.balance = await consultBalance(req.session.publicKey);
        res.status(200).redirect('/home?authenticated=true');
    }
    else{
        res.status(401).redirect('/home')
    }    
}

const registerUser = async(req,res) => {
    const {name, email, password, password_confirmation, bitcoin, ethereum} = req.body;
    result = await verify_email(email);    
    if (result[0].length === 0){
        if (password !== password_confirmation){
            res.send('<script> alert("The password confirmation does not match"); window.location.href = "/register"; </script>');        
        }        
        else{
            let id = await add_user_db(name,email,password);                     
            let cartera;
            if(ethereum === 'on'){                
                cartera = await createEthereumWallet(password);
                id = id[0][0].iduser;                
                console.log(cartera);
                await add_Wallet(id,'eth', cartera[0]);
                res.send('<script> alert("The account has been created with an ethereum wallet encrypted using your account password. Don not share it!"); window.location.href = "/"; </script>');           
            }
            else{
                res.send('<script> alert("The account has been created with no wallets"); window.location.href = "/"; </script>');               }           
            
        }
    }else
        res.send('<script> alert("The email is already registered"); window.location.href = "/register"; </script>');    
}

module.exports = {getUserLogin, registerUser}; 