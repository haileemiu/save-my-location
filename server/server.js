const app = require('express')();
const bodyParser = require('body-parser');
require('./db');

const port = 3000;

app.use(bodyParser.json())

app.use('/location', require('./routes/location'));

app.listen(port, () => console.log(`Listening on port ${port}`));
