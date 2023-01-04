const express = require('express');
const {getProfile} = require('./../middlewares/getProfile')
const validate = require('./../middlewares/validate');
const {jobValidation} = require('./../validations');
const {jobController} = require('../controllers');

const router = express.Router();

router
    .route('/unpaid')
    .get(getProfile, jobController.getUnpaidJobsByProfileId)

router
    .route('/:job_id/pay')
    .post(getProfile, validate(jobValidation.payForJobById), jobController.payForJobById)

module.exports = router;