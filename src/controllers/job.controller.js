const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { jobService } = require('../services')



const getUnpaidJobsByProfileId = catchAsync(async(req, res) => {
    const jobs = await jobService.findUnpaidJobsByProfileId(req.profile.id);
    res.status(httpStatus.OK).send(jobs);
});

const payForJobById = catchAsync(async(req, res) => {
    const result = await jobService.payForJob( req.params.job_id, req.profile.id);
    if(result.success) return res.status(httpStatus.OK).send(result.data);
    res.status(httpStatus.BAD_REQUEST).send(result.error)
});
module.exports = {
    getUnpaidJobsByProfileId,
    payForJobById
}