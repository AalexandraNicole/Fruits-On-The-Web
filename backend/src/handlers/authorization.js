const { getBody } = require("../utils/utils");
const { jwtDecode } = require('jwt-decode');

async function authorizationHandler(req, res, services) {
    const body = await getBody(req);

    const db = services.get("mongodb")?.db;
    if (db == null) {
        console.log("No db connection");
        res.writeHead(500);
        res.end();
        return;
    }

    const token  = body.token;
    try{
        let success = true;
        const decoded = jwtDecode(token);

        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decoded.exp < currentTime) {
            success = false;
        }
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ success }));
    } catch (error) {
        console.error('Error authentification:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
}

module.exports = authorizationHandler;
