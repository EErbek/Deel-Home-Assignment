const express = require('express');
const {getProfile} = require('./../middlewares/getProfile')
const validate = require('./../middlewares/validate');
const {adminValidation} = require('./../validations');
const { adminController } = require('../controllers');

const router = express.Router();
  router
  .route('/best-profession')
  .get(getProfile,validate(adminValidation.getBestProfession), adminController.getBestProfession)

  router
  .route('/best-clients')
  .get(getProfile, validate(adminValidation.getBestClients), adminController.getBestClients)

module.exports = router;