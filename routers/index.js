const user_router = require("./user-router");
const publisher_router = require("./publisher-router");
const news_router = require("./news-router");
const tag_router = require("./tag-router");
const subscription_router = require("./subscription-router");

const router = {
  user: user_router,
  publisher: publisher_router,
  news: news_router,
  tag: tag_router,
  subscription: subscription_router,
};

module.exports = router;
