const Web3 = require('web3');

<<<<<<< HEAD
infuraNode = 'https://mainnet.infura.io/v3/6c358fda8bc84a54949cd6ca0c321b98';
ganacheNode = 'HTTP://127.0.0.1:7545';
web3 = new Web3(new Web3.providers.HttpProvider(ganacheNode));

async function consultBalance(recipient){
  let bal;
  await web3.eth.getBalance(recipient, (err, balance) => {
    if(err) {
      console.log(err);
      return;
    }
    bal = web3.utils.fromWei(String(balance), 'ether')
  })
  return bal
}

module.exports = {consultBalance}

=======
ganacheNode = 'HTTP://127.0.0.1:7545';
web3 = new Web3(ganacheNode);

function getBalanceETH(address) {
    let balance = web3.eth.getBalance(address);
    return balance;
};

module.exports = {getBalanceETH}
>>>>>>> 9766b5186a372ea507b9586497fe560469577e37
