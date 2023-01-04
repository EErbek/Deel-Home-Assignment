const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { contractService } = require('../services')


const getContractById = catchAsync(async(req, res) => {
    const {id} = req.params;
    const contract = await contractService.findContractById(id, req.profile.id);
    if(!contract) return res.status(httpStatus.NOT_FOUND).send()
    res.status(httpStatus.OK).send(contract);
});


const getContractsByProfileId = catchAsync(async(req, res) => {
    const contracts = await contractService.findContractsByProfileId(req.profile.id);
    res.status(httpStatus.OK).send(contracts);
});
module.exports = {
    getContractById,
    getContractsByProfileId
}