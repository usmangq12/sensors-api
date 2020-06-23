const pg = require('pg');

const config = {
    user: 'postgres', //this is the db user credential
    database: 'sensors',
    password: '12345678',
    port: 5432,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('connected to the Database');
});

const createTables = async () => {
    var client = new pg.Client(config);
    client.connect();
    client.query('CREATE TABLE users(id SERIAL PRIMARY KEY, username VARCHAR(128), password VARCHAR(128));')
};

//export pool and createTables to be accessible  from an where within the application
module.exports = {
    createTables,
    pool,
};

require('make-runnable');