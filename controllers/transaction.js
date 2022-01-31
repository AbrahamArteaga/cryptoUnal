const Web3 = require('web3');
const ETx = require('ethereumjs-tx').Transaction;
const { serialize } = require('v8');

infuraNode = 'https://ropsten.infura.io/v3/6c358fda8bc84a54949cd6ca0c321b98';
ganacheNode = 'HTTP://127.0.0.1:7545';
web3 = new Web3(infuraNode);

//check eth balance

// const puba1 = '0xF8195a5B17Ff88B3fabB47df13176ea2D68464BC';
// const puba2 = '0x7eE21748b15cf380f7a334f02D4dbe4051e13E2D';
// const priva1 = new Buffer.from('6515abe4fc0d93898729b8090078c5d5ac634bad41cbf0581a6c44e0fc4d7af1', 'hex');
// const priva2 = new Buffer.from('0f248d097184df3bc6f71caa97410615944025534c444e5941806b7f640d93f4', 'hex');


const signTransaction = (sender, senderkey, recipient, amount) => {
    
    web3.eth.getBalance(sender, (err, balance) => {
        console.log(web3.utils.fromWei(balance, 'ether'))
    })

    web3.eth.getBalance(recipient, (err, balance) => {
        console.log(web3.utils.fromWei(balance, 'ether'))
    })


    web3.eth.getTransactionCount(sender, (err, txCount) => {
        let rawTx = {                                           // create the transaction
            nonce: web3.utils.toHex(txCount),
            gasPrice: web3.utils.toHex(web3.utils.toWei('2', 'gwei')),
            gasLimit: web3.utils.toHex(2100000),
            to: recipient,
            value: web3.utils.toHex(web3.utils.toWei(amount, 'ether'))
        }

        let tx = new ETx(rawTx, { 'chain': 'ropsten' })                             //sign the transaction
        tx.sign(new Buffer.from(senderkey, 'hex'))

        serializedTx = tx.serialize().toString('hex')

        web3.eth.sendSignedTransaction('0x' + serializedTx).on('receipt', console.log)

    });

};

const doTransaction = async(req, res) => {
    const { sender, senderkey, recipient, amount } = req.body;
    console.log("Sender", sender);
    await signTransaction(sender, senderkey, recipient, amount);
    res.send('transaction made');
}



module.exports = {doTransaction, signTransaction};
