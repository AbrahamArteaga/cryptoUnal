const Web3 = require('web3');

infuraNode = 'https://ropsten.infura.io/v3/6c358fda8bc84a54949cd6ca0c321b98';
ganacheNode = 'HTTP://127.0.0.1:7545';
web3 = new Web3(infuraNode);

async function createEthereumWallet( password = 0) {      
    if (password.length > 7 && typeof password === "string"){
        web3.eth.accounts.wallet.clear();
        let wallet = await web3.eth.accounts.wallet.create(1);             
        let keystore = await wallet.encrypt(password);
        return keystore;
    }
    return false;
};

(async function(){
    let i = 0
    while(i < 10){
        console.log(await createEthereumWallet("12345678"));
        i++;
    }  
})();

module.exports = {createEthereumWallet}