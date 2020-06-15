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
    client.query('CREATE TABLE sensors(id SERIAL PRIMARY KEY, z1 VARCHAR(128), z2 VARCHAR(128), z3 VARCHAR(128), z4 VARCHAR(128));CREATE TABLE users(id SERIAL PRIMARY KEY, userName VARCHAR(128) not null, password VARCHAR(128));')
};

//export pool and createTables to be accessible  from an where within the application
module.exports = {
    createTables,
    pool,
};

require('make-runnable');