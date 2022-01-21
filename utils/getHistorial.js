const API_URL = "https://api-ropsten.etherscan.io/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=6PQGYYRPN59V4YYXAY2JSWUAGU2N22K98M";
const axios = require('axios');



// no sé si sea necesario usar async await

async function  getHistorial(address){
    await axios.get(API_URL.replace('{address}', address)) // se reemplaza el {address} por la direccion de la cuenta
    .then(function (response) { 
        let transactions = response.data.result;
        let historial = [];
        for (let i = 0; i < transactions.length; i++) {
            let transaction = transactions[i];
            historial.push({
                addressFrom: transaction.from,
                addreTo: transaction.to,
                value: transaction.value,
                timestamp: transaction.timeStamp
            });
        }
        console.log(historial);
        return historial;
    }).catch(function (error) {
        console.log(error);
    });
}

module.exports = {getHistorial}