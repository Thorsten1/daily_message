const Client = require("@replit/database"); //repl.it key/value database
const client = new Client(); //initialise repl.it db client
const config_data = require('../config/security_config.json')
const {validateKey, validateValue} = require('./input_validation');

module.exports = function (app){
    // get endpoint to receive random message
    // TODO: implement daily check so only one message per day
    app.get('/', async (req, res) => {
        // get all keys with the given prefix
        let keys = await client.list(config_data.key_prefix)
        // get random element
        let result_key = keys[Math.floor(Math.random() * keys.length)]
        let result = await client.get(result_key, {raw:true})
        return res.json({"message": result})
    });

    // get endpoint to retrieve specific messages via its key
    app.get('/manage/:key', validateKey, async (req, res) => {
        let result = await client.get(req.params.key, {raw:true})
        return res.send(result)
    });

    // delete endpoint to delete specific message via its key
    app.delete('/manage/:key', validateKey, async (req, res) => {
        // delete the provided key
        await client.delete(req.params.key)
        // Always return 200 because repl.it db gives no feedback whether the key existed or the call wa successful
        return res.status(200).send({message:`${req.params.key} was successfully deleted`})
    });

    //post endpoint to upload new endpoints
    app.post('/manage/:key', validateKey, validateValue, async (req, res) => {
        // This will overwrite keys
        // Maybe add edit method and prevent this in the future
        await client.set(req.params.key, req.body.value);
        // Always return 200 because repl.it db gives no feedback whether the key existed or the call wa successful
        return res.status(200).send({message:`${req.params.key} was successfully added`})
    });
}