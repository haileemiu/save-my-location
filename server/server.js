// const app = require('express')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./db');

const port = 3003;

app.use(bodyParser.json())
app.use(express.static('../public'))

app.use('/location', require('./routes/location'));

app.listen(port, () => console.log(`Listening on port ${port}`));
