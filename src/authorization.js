// authorization.js
// This file includes the middleware for authorising users

module.exports = {
    // This middleware will check whether the user provided an authorisation token and what he is allowed to do
    isAuthorised: function(req, res, next){
        //retrieve config file to determine whether authorisation was disabled
        const config_data = require('../config/security_config.json')

        // retrieve the authorization header
        const authHeader = req.headers.authorization
        // get the tokens from the environment
        const readOnlyToken = process.env.READ_ONLYY_TOKEN
        const adminToken = process.env.ADMIN_TOKEN
        // If authorisation isn't disabled and the needed Tokens aren't defined throw an Server issue
        if (!config_data.disable_authorization && (!adminToken || (!readOnlyToken && !config_data.unauthorised_read_mode))) {
            console.error(`The environment Variable ADMIN_TOKEN: ${adminToken} or READ_ONLY_TOKEN ${readOnlyToken} isn't defined so no authorization is possible`)
            return res.status(500).json({
                status: 500,
                message: 'Authorization is configured improperly'
            })
        }

        // if authorisation is disabled skip checks
        // NOT RECOMMENDED!
        if (config_data.disable_authorization) {
            res.locals.admin = true
            next()
        }
        // if the provided token is the Admin token
        else if (authHeader == adminToken) {
            // set admin to true and proceed
            res.locals.admin = true
            next()
        }
        // if read is enabled without authorisation or the token is the read token
        else if (config_data.unauthorised_read_mode || authHeader == readOnlyToken) {
            // set admin to false (readOnly) and proceed
            res.locals.admin = false
            next()
        }
        // in all other cases return unauthorized message
        else {
            return res.status(401).json({
                status: 401,
                message: 'UNAUTHORIZED: you have to provide an authorization token in your header'
            })
        }

    }

}