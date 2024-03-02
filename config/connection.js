// Imports.
const { connect, connection } = require('mongoose');

// Connection to MongoDB database.
const connectionString = 'mongodb://localhost:27017/socialnetworkDB';

connect(connectionString);

module.exports = connection;