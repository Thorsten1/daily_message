// Requirements / Imports
const express = require('express'); // express library
const bodyParser = require('body-parser');  // Node.js body parsing middleware.
const rateLimit = require("express-rate-limit"); //rate limiting
const helmet = require('helmet'); // Set secure HTTP Headers
const morgan = require('morgan'); // Extended Logging
// Start of the actual App
const app = express();
// Add Middleware
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10 // limit each IP to x requests per windowMs
});
const swaggerUi = require('swagger-ui-express'); // swagger ui package
const YAML = require('yamljs'); // yaml parser for swagger file
const swaggerDocument = YAML.load('./swagger.yaml'); // load swagger file

//  apply to all requests
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(helmet());
app.use(helmet.xssFilter());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // show swagger ui
//Add authorization middleware
let authorization=require('./src/authorization');
app.use(authorization.isAuthorised)
app.use(authorization.needsAdminRights)
// Add error handling middleware
let error_handling=require('./src/error_handling');
app.use(error_handling)
// Initialize all routes:
require("./src/routes")(app);

const port = 3000 // start the server on this port
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

