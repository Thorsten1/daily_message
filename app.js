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
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Initialize all routes:
require("./src/routes")(app)

const port = 3000 // start the server on this port
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

