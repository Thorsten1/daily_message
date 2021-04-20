// Requirements / Imports
const express = require('express'); // express library
const bodyParser = require('body-parser');  // Node.js body parsing middleware.
const cors = require('cors'); // Set CORS Headers
const helmet = require('helmet'); // Set secure HTTP Headers
const morgan = require('morgan'); // Extended Logging
const Client = require("@replit/database"); //repl.it key/value database



// Start of the actual App

const app = express();
// Configure Body Parser and express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(cors());
app.use(morgan('combined'));
const client = new Client(); //initialise repl.it dv client


// get endpoint to receive random message
// TODO: implement daily check so only one message per day
app.get('/', async (req, res) => {
    let keys = await client.list()
    // get random element
    result_key = keys[Math.floor(Math.random() * keys.length)]
    let result = await client.get(result_key, {raw:true})
    return res.send(result)
});

// get endpoint to retrieve specific messages via its key
app.get('/get/:key', async (req, res) => {
    // raw value to simply store and get string values
    let result = await client.get(req.params.key, {raw:true})
    return res.send(result)
});

// delete endpoint to delete specific message via its key
app.delete('/get/:key', async (req, res) => {
    // delete the provided key
    await client.delete(req.params.key)
    // Always return 200 because repl.it db gives no feedback whether the key existed or the call wa successful
    return res.status(200)
});

//post endpoint to upload new endpoints
app.post('/add', async (req, res) => {
    // This will overwrite keys
    // Maybe add edit method and prevent this in the future
    await client.set(req.body.key, req.body.value);
    // Always return 200 because repl.it db gives no feedback whether the key existed or the call wa successful
    return res.status(200)
});


const port = 3000 // start the server on this port
app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});

