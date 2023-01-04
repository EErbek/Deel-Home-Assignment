const Joi = require('joi');

const makeDeposit = {
    params: Joi.object().keys({
        userId: Joi.number().required(),
    }),
    body: Joi.object().keys({
        amount: Joi.number().required()
    })
};

module.exports = {
    makeDeposit,
};
