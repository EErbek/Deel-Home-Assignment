const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {balanceService} = require("../services");

const makeDeposit = catchAsync(async (req, res) => {
    console.log(req.body.amount)
    const result = await balanceService.addBalance(req.params.userId, req.body.amount);
    if (result.success) return res.status(httpStatus.OK).send(result.data);
    res.status(httpStatus.BAD_REQUEST).send(result.error)
});

module.exports = {
    makeDeposit,
};
