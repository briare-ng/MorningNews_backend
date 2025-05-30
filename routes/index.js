var express = require("express");
var router = express.Router();

const fetch = require("node-fetch");

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const imgUrl = "/empty_urltoimg.jpg";

router.get("/articles", (req, res) => {
  fetch(
    `https://newsapi.org/v2/everything?sources=the-verge,techcrunch,the-next-web,wired&apiKey=${NEWS_API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.articles.map((data) => {
        if (data.urlToImage == "" || data.urlToImage == null) {
          data.urlToImage = imgUrl;
        }
      });

      if (data.status === "ok") {
        res.json({ articles: data.articles });
      } else {
        res.json({ articles: [] });
      }
    });
});

module.exports = router;
