const Web3 = require('web3');

infuraNode = 'https://ropsten.infura.io/v3/6c358fda8bc84a54949cd6ca0c321b98';
ganacheNode = 'HTTP://127.0.0.1:7545';
web3 = new Web3(infuraNode);

async function decrypt_wallet(encrypted_wallet={} , key="") {       
    if(typeof encrypted_wallet === "object" && typeof key === "string"){
        try{
            let wallet = [encrypted_wallet];        
            let decryptedWallet = await web3.eth.accounts.wallet.decrypt(wallet, key);            
            return decryptedWallet;
        }
        catch (error) { 
            console.log(error)
            return "Cartera no valida, clave erronea o vacia";
        }        
    }
    return false;
};

module.exports = {decrypt_wallet};