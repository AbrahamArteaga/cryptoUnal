const Web3 = require('web3');

infuraNode = 'https://ropsten.infura.io/v3/6c358fda8bc84a54949cd6ca0c321b98';
ganacheNode = 'HTTP://127.0.0.1:7545';
web3 = new Web3(infuraNode);

async function createEthereumWallet( password ) {      
    let wallet = await web3.eth.accounts.wallet.create(1,web3.utils.randomHex(32));     
    let keystore = await wallet.encrypt(password);
    return keystore;
};
module.exports = {createEthereumWallet}