const Web3 = require('web3');

infuraNode = 'https://ropsten.infura.io/v3/6c358fda8bc84a54949cd6ca0c321b98';
ganacheNode = 'HTTP://127.0.0.1:7545';
web3 = new Web3(new Web3.providers.HttpProvider(infuraNode));

async function consultBalance(recipient){
  let bal;
  await web3.eth.getBalance(recipient, (err, balance) => {
    if(err) {
      console.log(err);
      return false;
    }
    bal = web3.utils.fromWei(String(balance), 'ether')
  })
  return bal
}

module.exports = {consultBalance}
