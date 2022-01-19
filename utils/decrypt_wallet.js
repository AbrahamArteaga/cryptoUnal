const Web3 = require('web3');

infuraNode = 'https://ropsten.infura.io/v3/6c358fda8bc84a54949cd6ca0c321b98';
ganacheNode = 'HTTP://127.0.0.1:7545';
web3 = new Web3(infuraNode);

function decrypt_wallet(encrypted_wallet, key) {   
    let wallet = [encrypted_wallet];
    let decryptedWallet = web3.eth.accounts.wallet.decrypt(wallet, key);
    return decryptedWallet;
};
module.exports = {decrypt_wallet}