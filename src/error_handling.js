//error_handling.js
// Prevent Stack Trace leaking threw error messages

module.exports =  function(err, req, res, next) {
    console.log(err.stack);
    const config_data = require('../config/security_config.json')
    res.status(err.status || 500);
    // if config variable development is set the error message can contain the stack trace
    if (config_data.development) {
        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    }
    // in all other cases remove the stack trace and only send the message
    else {
        res.json({
            'errors': {
                message: err.message,
                error: {}
            }
        });
    }
    next()
}
