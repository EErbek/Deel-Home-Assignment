const express = require('express');
const {getProfile} = require('./../middlewares/getProfile')
const validate = require('./../middlewares/validate');
const {balanceValidation} = require('./../validations');
const {balanceController} = require('../controllers');

const router = express.Router();

  router
  .route('/deposit/:userId')
  .post(getProfile, validate(balanceValidation.makeDeposit), balanceController.makeDeposit)

module.exports = router;