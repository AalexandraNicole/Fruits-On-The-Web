function testHandler(_, res) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Routes middleware works");
}

module.exports = testHandler;
