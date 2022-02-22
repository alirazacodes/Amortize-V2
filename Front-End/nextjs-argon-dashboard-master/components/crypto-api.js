// const rp = require('request-promise');
// const requestOptions = {
//     method: 'GET',
//     uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
//     qs: {
//         'start': '1',
//         'limit': '5000',
//         'convert': 'USD'
//     },
//     headers: {
//         'X-CMC_PRO_API_KEY': '33e0b049-8ae8-4e90-8d26-8b9e01c70ed2'
//     },
//     json: true,
//     gzip: true
// };

// "use strict";

// const CoinMarketCap = require('coinmarketcap-api')

// const apiKey = '33e0b049-8ae8-4e90-8d26-8b9e01c70ed2'
// const client = new CoinMarketCap(apiKey)

// let url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", qString = "?CMC_PRO_API_KEY=" + '33e0b049-8ae8-4e90-8d26-8b9e01c70ed2' + "start=1&limit=10&convert=USD";

const CoinGecko = require('coingecko-api');

//2. Initiate the CoinGecko API Client
const CoinGeckoClient = new CoinGecko();

//3. Make calls
// var getBTC = async () => {
//     let data = await CoinGeckoClient.simple.price({
//         ids: "bitcoin",
//         vs_currencies: "usd"
//     });
//     console.log(data.data.bitcoin.usd);
// };
export var getSTX = async () => {
    let data = await CoinGeckoClient.simple.price({
        ids: "blockstack",
        vs_currencies: "usd",
        include_24hr_change: "true"
    });
    return [data.data.blockstack.usd, data.data.blockstack.usd_24h_change];
};

export var getBTC = async () => {
    let data = await CoinGeckoClient.simple.price({
        ids: "bitcoin",
        vs_currencies: "usd",
        include_24hr_change: "true"
    });
    // console.log(data.data.bitcoin.usd);
    return [data.data.bitcoin.usd, data.data.bitcoin.usd_24h_change];
};
// console.log(getBTC2().then);


// export default function getBTC() {
//     // rp(requestOptions).then(response => {
//     //     console.log('API call response:', response);
//     // }).catch((err) => {
//     //     console.log('API call error:', err.message);
//     // });

//     // client.getTickers({ mode: "no-cors", mode: "Access-Control-Allow-Origin" }).then(console.log).catch(console.error)
//     // client.getGlobal({ mode: "no-cors", mode: "Access-Control-Allow-Origin" }).then(console.log).catch(console.error)


//     // fetch(url + qString)
//     //     .then(resp => {
//     //         return resp.json();
//     //     })
//     //     .then(data => {
//     //         console.log(data);
//     //     });



//     console.log(getBTC2);
// };