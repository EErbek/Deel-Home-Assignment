const Joi = require('joi');

const getContractById = {
    params: Joi.object().keys({
        id: Joi.number().required(),
    }),
};

module.exports = {
    getContractById,
};
