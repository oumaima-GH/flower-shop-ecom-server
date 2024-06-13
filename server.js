const app = require('./index');
const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";
const db = require('./prismaDb');


app.listen(port, host, () => {
    console.log(`Server is running on: http://${host}:${port}`);
});

module.exports = db;