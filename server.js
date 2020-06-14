

var express = require("express"),
app = express(),
port = process.env.PORT || 3200
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(express.json())
app.use(cors())
// route
app.get('/', (req, res) => {
    res.send('Welcome to our sensors api')
});

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/sensors', (req, res) => {
    pool.connect((err, client, done) => {
        const query = 'SELECT * FROM sensors';
        client.query(query, (error, result) => {
          done();
          if (error) {
            res.status(400).json({error})
          } 
          res.status(200).send({
            status: true,
            message: 'sensors retrieved',
            sensors: result.rows,
            });
        });
      });
    });

app.listen(port);
console.log("Server started on", port);