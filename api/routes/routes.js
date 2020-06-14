const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/sensors', (req, res) => {
    pool.connect((err, client, done) => {
        const query = 'SELECT * FROM sensors';
        client.query(query, (error, result) => {
          done();
          if (error) {
            res.status(400).json({error})
          } 
          if(result.rows < '1') {
            res.status(404).send({
            status: 'Failed',
            message: 'No sensor found',
            });
          } else {
            res.status(200).send({
            status: 'Successful',
            message: 'sensors retrieved',
            students: result.rows,
            });
          }
        });
      });
    });
