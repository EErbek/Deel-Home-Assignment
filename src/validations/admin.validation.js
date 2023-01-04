const Joi = require('joi');

const getBestProfession = {
    query: Joi.object().keys({
        start: Joi.date().required(),
        end: Joi.date().required(),
    }),
};

const getBestClients = {
    query: Joi.object().keys({
        start: Joi.date().required(),
        end: Joi.date().required(),
        limit: Joi.number().min(1),
    }),
};

module.exports = {
    getBestProfession,
    getBestClients,
};
