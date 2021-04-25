// Validate and Sanitize Input
const {check, validationResult} = require('express-validator');
const config_data = require('../config/security_config.json') // config file path
exports.validateKey = [
    check('key')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('The key can\'t be empty!')
        .bail()
        .isLength({max: 32})
        .withMessage(`Your key length is invalid it needs to be between 1 and ${config_data.key_length}.`)
        .matches("^[a-zA-Z\_]+$")
        .withMessage("Invalid Key. Must contain only letters and underscores."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
];
exports.validateValue = [
    check('value')
        .not()
        .isEmpty()
        .withMessage('The value can\'t be empty!')
        .bail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json({errors: errors.array()});
        next();
    },
]