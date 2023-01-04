const express = require('express');
const {getProfile} = require('./../middlewares/getProfile')
const validate = require('./../middlewares/validate');
const {contractValidation} = require('./../validations');
const {contractController} = require('../controllers');

const router = express.Router();

router
    .route('/')
    .get(getProfile, contractController.getContractsByProfileId)

router
    .route('/:id')
    .get(getProfile, validate(contractValidation.getContractById), contractController.getContractById)

module.exports = router;