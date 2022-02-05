const axios = require('axios');
const { response } = require('express');


async function getHistorical() {
    try {
      let dates = [];
      let prices = [];
      const response = await axios.get("https://min-api.cryptocompare.com/data/v2/histohour?fsym=ETH&tsym=USD&limit=12");
      //recorrer el array de resultados y agregar la fecha a cada elemento
      response.data.Data.Data.forEach(element => {
        prices.push(element.close);
        dates.push(new Date(element.time * 1000).toLocaleTimeString());
      });
      return [dates, prices]; 
    } catch (error) {
      console.error(error);
    }

  }

module.exports = {getHistorical};

  

