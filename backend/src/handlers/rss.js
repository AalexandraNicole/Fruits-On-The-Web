const RSS = require("rss-generator");

async function fetchTopUsers(services, res) {
  const db = services.get("mongodb")?.db;
  if (!db) {
    console.log("No db connection");
    res.writeHead(500, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    });
    res.end("Internal Server Error");
    return null;
  }

  try {
    const users = await db
      .collection("users")
      .find()
      .sort({ score: -1 })
      .limit(10)
      .toArray();
    return users;
  } catch (err) {
    console.error(err);
    res.writeHead(500, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    });
    res.end("Internal Server Error");
    return null;
  }
}

async function generateRSS(services, res) {
  const users = await fetchTopUsers(services, res);
  if (!users) return null;

  const feed = new RSS({
    title: "Top 10 Players RSS Feed",
    description: "RSS feed of the top 10 players by score",
    feed_url: "http://127.0.0.1:5501/frontend/html/ranksPage.html",
    site_url: "http://127.0.0.1:5501/frontend/html/MainUnloggedPage.html",
  });

  users.forEach((user, index) => {
    feed.item({
      title: `${index + 1}. ${user.username} - Score: ${user.score}`,
      description: `Username: ${user.username}, Score: ${user.score}`,
    });
  });

  return feed.xml({ indent: true });
}

async function rssHandler(req, res, services) {
  const rssFeed = await generateRSS(services, res);
  if (rssFeed) {
    res.writeHead(200, {
      "Content-Type": "application/rss+xml",
      "Access-Control-Allow-Origin": "*",
    });
    res.end(rssFeed);
  } else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*",
    });
    res.end("Not Found");
  }
}

module.exports = rssHandler;
