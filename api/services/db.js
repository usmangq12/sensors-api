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

const sensorTable = `CREATE TABLE IF NOT EXISTS
        sensors(
            id SERIAL PRIMARY KEY,
            z1 VARCHAR(128),
            z2 VARCHAR(128),
            z3 VARCHAR(128),
            z4 VARCHAR(128)
        )`;

const loginTable = `CREATE TABLE IF NOT EXISTS
        login(
            id SERIAL PRIMARY KEY,
            userName VARCHAR(128),
            password VARCHAR(128),
        )`

const createTables = () => {

    // pool.query(sensorTable)
    //     .then((res) => {
    //         console.log("sensorTable Created");
    //         pool.end();
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         pool.end();
    //     });

    pool.query(loginTable)
        .then((res) => {
            console.log("loginTable Created");
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});


//export pool and createTables to be accessible  from an where within the application
module.exports = {
    createTables,
    pool,
};

require('make-runnable');