var express = require("express");
var router = express.Router();

const request = require("request");
const cheerio = require("cheerio");

router.post("/description", async (req, res) => {
  console.log('job desc %%%%%%%%%%%%', req.body.link);
  request(req.body.link,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const heading = $(".title")
          .find("a")
          .text();
        const company = $(".sjcl")
          .find("a")
          .text();
        var test = [];
        $(".jobsearch-SerpJobCard").each((i, el) => {
          let jobTitle = $(el)
            .find(".title")
            .text()
            .replace(/\s\s+/g, "");
          let companyName = $(el)
            .find(".company")
            .text()
            .trim();
          let companyRating = $(el)
            .find(".ratingsContent")
            .text()
            .trim();
          let location = $(el)
            .find(".location")
            .text()
            .trim();
          //.replace(/\s\s+/g, '');
          let summary = $(el)
            .find(".summary")
            .text()
            .trim();
          let link = $(".title")
            .find("a")
            .attr('href');
          //.attr('href'); location
          // const date = $(el)
          //   .find('.post-date')
          //   .text()
          //   .replace(/,/, '');
          let linkPrefix = 'https://www.indeed.com' + link;
          let one = {
            name: jobTitle,
            company: companyName,
            rating: companyRating,
            location: location,
            summary: summary,
            link: linkPrefix
          };
          test.push(one);
        });

        console.log("Scraping Done...", test);
        res.send(test);
    
      }
    }
  );

})

router.get("/", function(req, res, next) {
  
  request(
    "https://www.indeed.com/jobs?q=software+developer&l=Kansas+City%2C+MO",
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const heading = $(".title")
          .find("a")
          .text();
        const company = $(".sjcl")
          .find("a")
          .text();
        var test = [];
        $(".jobsearch-SerpJobCard").each((i, el) => {
          let jobTitle = $(el)
            .find(".title")
            .text()
            .replace(/\s\s+/g, "");
          let companyName = $(el)
            .find(".company")
            .text()
            .trim();
          let companyRating = $(el)
            .find(".ratingsContent")
            .text()
            .trim();
          let location = $(el)
            .find(".location")
            .text()
            .trim();
          //.replace(/\s\s+/g, '');
          let summary = $(el)
            .find(".summary")
            .text()
            .trim();
          let link = $(".title")
            .find("a")
            .attr('href');
          //.attr('href'); location
          // const date = $(el)
          //   .find('.post-date')
          //   .text()
          //   .replace(/,/, '');
          let linkPrefix = 'https://www.indeed.com' + link;
          let one = {
            name: jobTitle,
            company: companyName,
            rating: companyRating,
            location: location,
            summary: summary,
            link: linkPrefix
          };
          test.push(one);
        });

        console.log("Scraping Done...", test);
        res.send(test);
        // console.log('Heading..........', heading);
        // console.log('Company..........', company);
      }
    }
  );
});

module.exports = router;
