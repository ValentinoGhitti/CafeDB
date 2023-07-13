require('dotenv').config();
const Server = require('./models/server');
console.clear();

const server = new Server();

server.listen();
