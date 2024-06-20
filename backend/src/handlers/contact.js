async function contactHandler(req, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Contact works");
}

module.exports = contactHandler;
