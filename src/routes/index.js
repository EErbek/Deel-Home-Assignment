const express = require('express');
const contractRoute = require('./contract.route');
const jobRoute = require('./job.route');
const balanceRoute = require('./balance.route');
const adminRoute = require('./admin.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/contracts',
    route: contractRoute,
  },
  {
    path: '/jobs',
    route: jobRoute,
  },
  {
    path: '/balances',
    route: balanceRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
