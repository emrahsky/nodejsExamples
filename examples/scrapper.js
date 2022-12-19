const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html";

getData = async () => {

    try {
        await axios
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

getData();
