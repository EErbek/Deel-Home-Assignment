const {models} = require('./../models');
const {Op} = require("sequelize");

const findContractById = async (id, profileId) => {
    const filter = {
        where: {
            id: id,
            [Op.or]: [
                {ContractorId: profileId},
                {ClientId: profileId}
            ]
        }
    }
    return await models.Contract.findOne(filter)
}

const findContractsByProfileId = async (profileId) => {
    const filter = {
        where: {
            [Op.or]: [
                {ContractorId: profileId},
                {ClientId: profileId}
            ],
            status: {[Op.not]: 'terminated'}
        }
    }
    return await models.Contract.findAll(filter)
}

module.exports = {
    findContractById,
    findContractsByProfileId
}