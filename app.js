// Requirements / Imports
const express = require('express'); // express library
const bodyParser = require('body-parser');  // Node.js body parsing middleware.
const cors = require('cors'); // Set CORS Headers
const helmet = require('helmet'); // Set secure HTTP Headers
const morgan = require('morgan'); // Extended Logging
// Start of the actual App
const app = express();
// Add Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());
//Add authorization middleware
let authorization=require('./src/authorization');
app.use(authorization.isAuthorised)
// Add error handling middleware
let error_handling=require('./src/error_handling');
app.use(error_handling)
// Initialize all routes:
require("./src/routes")(app);

const port = 3000 // start the server on this port
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

