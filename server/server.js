const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const PORT = 3000;
const api = require('./routes/api')
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/home', api)
app.get('/', (req, res) => res.send('hello fsrom server'))

app.listen(PORT, () => console.log('listening port'+ PORT));