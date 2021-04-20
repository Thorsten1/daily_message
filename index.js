// Requirements / Imports
const express = require('express'); // express library
const bodyParser = require('body-parser');  // Node.js body parsing middleware.
const cors = require('cors'); // Set CORS Headers
const helmet = require('helmet'); // Set secure HTTP Headers
const morgan = require('morgan'); // Extended Logging


// Start of the actual App

const app = express();
// Configure Body Parser and express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    return res.send('This seems to work.')
});

// start the server on Port 3000
app.listen(3000, () => {
    console.log(`Example app listening on port 3000!`);

});

