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
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/sensors', (req, res) => {
  pool.connect((err, client, done) => {
    const query = 'SELECT * FROM sensors ORDER BY id ASC LIMIT 100 ';
    client.query(query, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error })
      }
      res.status(200).send({
        status: true,
        message: 'users retrieved',
        sensors: result.rows,
      });
    });
  });
});

app.get('/users', (req, res) => {
  pool.connect((err, client, done) => {
    const query = 'SELECT * FROM users';
    client.query(query, (error, result) => {
      done();
      if (error) {
        res.status(400).json({ error })
      }
      res.status(200).send({
        status: true,
        message: 'Users Added',
        users: result.rows,
      });
    });
  });
});

app.post('/add-users', (req, res) => {
  const {username, password} = req.body;
  pool.connect((err, client, done) => {
    const query = `INSERT INTO users(username, password) VALUES (${username}, ${password}) `;
    client.query(query, (error, result) => {
      if (error) {
        res.status(400).json({error});
      }
      else {
        res.status(202).send({
          status: true,
          result: result,
        });
      }
      console.log('result:', result)

    });
  });
});

app.put('/update', (req, res) => {
  const {id, z1, z2, z3, z4} = req.body;
  pool.connect((err, client, done) => {
    const query = `UPDATE sensors SET z1=${z1}, z2=${z2}, z3=${z3}, z4=${z4} WHERE id=${id}`;
    client.query(query, (error, result) => {
      if (error) {
        res.status(400).json({error});
      }
      res.status(202).send({
        status: true,
        result: result,
      });
    });
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  pool.connect((err, client, done) => {
    const query = `DELETE FROM sensors WHERE id=${id}`
    client.query(query, (error, result) => {
      if(error){
        res.status(400).json({error})
      }
      res.status(204).send({
        status: true,
        result: result,
      })
    })
  })
});

app.listen(port);