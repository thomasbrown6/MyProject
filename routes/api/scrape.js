const router = require("express").Router();
var cheerio = require("cheerio");
var request = require("request");

router.get("/", function (req, res) {

    request("https://www.quickenloans.com/mortgage-rates", function (error, response, html) {

        let $ = cheerio.load(html);

        let results = [];

        $("section.o-Grid").each(function (i, element) {

            // var title = $(element).text();
            let rate1 = $(element).find("p.sls-u-mbn").text();
            console.log("rate" + rate1);
            let rates = rate1.split("%");
            console.log("array of rates ")
            console.log(rates[0])
            console.log(rates[1])
            console.log(rates[2])
            console.log(rates[3])
            console.log(rates[4])
            results.push({
                rates: rates,
            });
            console.log(results)
        });
        
        res.json(results)
    });
    
})
module.exports = router   