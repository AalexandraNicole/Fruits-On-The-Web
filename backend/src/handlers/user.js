async function getUsers(db) {
    const users = await db.collection('users').find({}).toArray();
    return users;
}

async function usersHandler(req, res, services){
    const db = services.get("mongodb")?.db;
    if (!db) {
        console.log("No db connection");
        res.writeHead(500);
        res.end();
        return;
    }

    try {
        const users = await getUsers(db);
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ users }));
    } catch (error) {
        console.error("Error fetching Users data:", error);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
    }
}

module.exports = usersHandler;