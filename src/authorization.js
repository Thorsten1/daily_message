// authorization.js
// This file includes the middleware for authorising users
//retrieve config file to determine whether authorisation was disabled
const config_data = require('../config/security_config.json')

module.exports = {
    // This middleware will check whether the user provided an authorisation token and what he is allowed to do
    isAuthorised: function(req, res, next){
                // retrieve the authorization header
        const authHeader = req.headers.authorization
        // get the tokens from the environment
        const userToken = process.env.USER_TOKEN
        const adminToken = process.env.ADMIN_TOKEN
        // If authorisation isn't disabled and the needed Tokens aren't defined throw an Server issue
        if (!config_data.disable_authorization && (!adminToken || (!userToken && !config_data.unauthorised_user_mode))) {
            console.error(`The environment Variable ADMIN_TOKEN: ${adminToken} or USER_TOKEN ${userToken} isn't defined so no authorization is possible`)
            return res.status(500).json({
                status: 500,
                message: 'Authorization is configured improperly'
            })
        }

        // if authorization is disabled skip checks
        // NOT RECOMMENDED!
        if (config_data.disable_authorization) {
            res.locals.admin = true
            next()
        }
        // if the provided token is the Admin token
        else if (authHeader === adminToken) {
            // set admin to true and proceed
            res.locals.admin = true
            next()
        }
        // if user mode is enabled without authorisation or the token is the user token
        else if (config_data.unauthorised_user_mode || authHeader === userToken) {
            // set admin to false (user) and proceed
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

    },
    needsAdminRights: function(req, res, next){
        // This function determines whether admin access is needed for the requested endpoint.
        // The default is that every endpoint needs admin rights.
        // To make endpoints accessible for the user add them to the user_endpoints list in the security_config.json
        let needsAdmin = true
        // remove param from URL (split into list at slash, remove last element and rejoin (maybe replace with regex)
        // add a special case for the baseurl endpoint so that this would not trigger when the replace fails
        let endpointURL = (req.url !== '/')? req.url.split('/').slice(0,-1).join('/') : '/'
        // if the endpoint (route + http method) is within the user_endpoints list no admin rights are required
        for (let i of config_data.user_endpoints) if (endpointURL === i.route && req.method === i.method){
            needsAdmin = false
            // if we found something we can stop right here and proceed
            break
        }
        if(res.locals.admin || !needsAdmin){
            next()
        }
        else{
            return res.status(401).json({
                status: 401,
                message: 'UNAUTHORIZED: The requested endpoint requires admin rights but you have only user access.'
            })
        }
    }

}