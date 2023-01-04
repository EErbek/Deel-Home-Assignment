const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {adminService} = require("../services");

const getBestProfession = catchAsync(async (req, res) => {
    const result = await adminService.findBestProfession(req.query.start, req.query.end);
    if (result.success) return res.status(httpStatus.OK).send(result.data);
    res.status(httpStatus.BAD_REQUEST).send(result.error)
});

const getBestClients = catchAsync(async (req, res) => {
    const result = await adminService.findBestClients(req.query.start, req.query.end, req.query.limit);
    if (result.success) return res.status(httpStatus.OK).send(result.data);
    res.status(httpStatus.BAD_REQUEST).send(result.error)
});

module.exports = {
    getBestProfession,
    getBestClients
};
