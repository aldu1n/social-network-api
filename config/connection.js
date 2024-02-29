const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/socialnetworkDB';

connect(connectionString);

module.exports = connection;