// const request = require('request');

// // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
// const url = 'https://api.currencybeacon.com/v1/latest?api_key=53eb68e4e100341b26c72ef7874f8e41';

// request.get({
//     url: url,
//     json: true,
//     headers: {'User-Agent': 'request'}
//   }, (err, res, data) => {
//     if (err) {
//       console.log('Error:', err);
//     } else if (res.statusCode !== 200) {
//       console.log('Status:', res.statusCode);
//     } else {
//       // data is successfully parsed as a JSON object:
//       console.log(data);
//     }
// });



// const puppeteer = require('puppeteer')

// async function scrape() {
//    const browser = await puppeteer.launch({})
//    const page = await browser.newPage()

//    await page.goto('https://www.thesaurus.com/browse/smart')

//    for(i = 1; i < 6; i++){
//     var element = await page.waitForSelector("#meanings > div.css-ixatld.e15rdun50 > ul > li:nth-child(" + i + ") > a")
//     var text = await page.evaluate(element => element.textContent, element)
//     console.log(text)
//    }
//    browser.close()
// }


// scrape()


const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html";


getData = async () => {

    try {
        const response = await axios
        .get(url, {
            headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        })
        .then(
            (response) => {
                const html = response.data;
                const $ = cheerio.load(html);
                const d = $("body > div.wy-grid-for-nav > nav > div > div.wy-menu.wy-menu-vertical > ul.current > li.toctree-l1.current > ul").text();
                console.log(d);
            }
        )
        .catch((error) => console.log(error));
        
    }  catch (error) {
        console.log(error.message);
    }

}

//getData();
