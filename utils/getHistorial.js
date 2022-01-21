const API_URL = "https://api-ropsten.etherscan.io/api?module=account&action=txlist&address={address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=FGVV1TVIVPSR4DGEIC9E55G2ZABUBMA4XA";
const axios = require('axios');



// no sé si sea necesario usar async await

async function getHistorial(address) {
    try {
      const response = await axios.get(API_URL.replace('{address}', address));
      console.log(response);
      response.data.result.forEach(element => {
        element.timeStamp = new Date(element.timeStamp * 1000);
      });
      return response.data.result;
    } catch (error) {
      console.error(error);
    }
}


module.exports = {getHistorial}