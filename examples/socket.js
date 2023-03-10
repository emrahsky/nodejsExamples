const express = require("express");
const fetch = require("node-fetch");
const xml = require('xml2js').parseString;

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const timeoutTime = 5000;

let Data;

let fetchCurrency = async () => {
    try {
        let response = await fetch('https://www.tcmb.gov.tr/kurlar/today.xml')
        let text = await response.text()
        xml(text, (e, output) => {
            Data = output.Tarih_Date.Currency[0]
            //Data = output
        })
    } catch (e) {
        console.log(e)
    }
}

let currencyPoller = async () => {
    await fetchCurrency()
    setTimeout(async () => {
        await fetchCurrency()
        console.log(`Sunucuda data yenilendi.`)
        currencyPoller()
    }, timeoutTime);
}

currencyPoller()

io.on("connection", (socket) => {
    console.log(`Yeni bir bağlantı yapıldı.`)

    let socketPoller = () => {
        socket.emit('currency-data', Data)
        setTimeout(() => {
            socket.emit('currency-data', Data)
            console.log(`Bağlantıya veri gönderimi yapıldı.`)
            socketPoller()
        }, timeoutTime);
    }

    socketPoller()

    socket.on("disconnect", () => {
        console.log(`Bağlantı koptu.`)
    })
})


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/socket/datas.html');
});

http.listen(3000, () => {
    console.log(`I'm alive!`)
})
