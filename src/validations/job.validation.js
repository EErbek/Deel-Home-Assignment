const Joi = require('joi');

const payForJobById = {
    params: Joi.object().keys({
        job_id: Joi.number().required(),
    }),
};


module.exports = {
    payForJobById,
};
