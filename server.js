const app = require('./index');
const port = process.env.PORT || 3000;
const host = process.env.HOST || "127.0.0.1";
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


app.listen(port, host, () => {
    console.log(`Server is running on: http://${host}:${port}`);
});

module.exports = prisma;