const router = require("express").Router();
var cheerio = require("cheerio");
var request = require("request");

router.get("/", function (req, res) {

    request("https://markets.on.nytimes.com/research/markets/rates/rates.asp", function (error, response, html) {
        if (error) {
            return res.json({message: error.message})
        
        }
        // console.log(html);
        let $ = cheerio.load(html);

        let results = [];

        $("table.keyRates").each(function (i, element) {
            // console.log("element1")
            // console.log(element)

            // var title = $(element).text();
            let rate1 = $(element).find("td.current").text();
            // console.log("rate" + rate1);
            // let rates = rate1.slice(0,4,8,12,16,20);
            // console.log("array of rates ")
            let rates= [rate1[8]+rate1[9]+rate1[10]+rate1[11],
            rate1[12]+rate1[13]+rate1[14]+rate1[15],
            rate1[16]+rate1[17]+rate1[18]+rate1[19],
            rate1[20]+rate1[21]+rate1[22]+rate1[23],
            rate1[24]+rate1[25]+rate1[26]+rate1[27],
            rate1[28]+rate1[29]+rate1[30]+rate1[31],
            rate1[32]+rate1[33]+rate1[34]+rate1[35]];
            console.log("rates split up")
            console.log(rates)

            // console.log(rates[0])
            // console.log(rates[1])
            // console.log(rates[2])
            // console.log(rates[3])
            // console.log(rates[4])
            results.push({
                rates: rates,
            });
            console.log(results)
        });
        
        res.json(results)
    });
    
})
module.exports = router   