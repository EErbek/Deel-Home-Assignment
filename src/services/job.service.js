const sequelize = require("./../models");
const {Op} = require("sequelize");

const findUnpaidJobsByProfileId = async (profileId) => {
    const filter = {
        where: {
            paid: {[Op.not]: true},
        },
        include: [
            {
                model: sequelize.models.Contract,
                required: true,
                where: {
                    [Op.or]: [{ContractorId: profileId}, {ClientId: profileId}],
                    status: "in_progress",
                },
            },
        ],
    };
    return await sequelize.models.Job.findAll(filter);
};

const payForJob = async (id, profileId) => {
    const t = await sequelize.transaction();
    try {
        const filter = {
            where: {
                id: id,
            },
            include: [
                {
                    model: sequelize.models.Contract,
                    required: true,
                    where: {
                        ClientId: profileId,
                    },
                },
            ],
        };
        const job = await sequelize.models.Job.findOne(filter, {transaction: t});
        if (!job) throw new Error("Job not found")
        if (job.paid == true) throw new Error("Job already paid")

        const client = await sequelize.models.Profile.findOne({where: {id: profileId}}, {transaction: t});
        if (job.price > client.balance) throw new Error("Insufficient balance")
        await client.decrement('balance', {by: job.price}, {transaction: t});

        const contractor = await sequelize.models.Profile.findOne({where: {id: job.Contract.ContractorId}}, {transaction: t});
        await contractor.increment('balance', {by: job.price}, {transaction: t});

        const result = await sequelize.models.Job.update({
            paid: true,
            paymentDate: new Date()
        }, {where: {id: id}}, {transaction: t});
        await job.reload();
        await t.commit();

        return {success: true, data: job}
    } catch (error) {
        await t.rollback;
        return {success: false, error: error.message}
    }
};

module.exports = {
    findUnpaidJobsByProfileId,
    payForJob
};
