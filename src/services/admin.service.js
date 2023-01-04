const sequelize = require("./../models");
const {Op} = require("sequelize");

const findBestProfession = async (start, end) => {
    let jobsGrouped = await sequelize.models.Job.findAll({
        attributes: [[sequelize.fn("sum", sequelize.col("price")), "total"]],

        order: [[sequelize.fn("sum", sequelize.col("price")), "DESC"]],
        group: ["Contract.Contractor.profession"],
        limit: 1,
        where: {
            paymentDate: {
                [Op.between]: [start, end],
            },
            paid: true,
        },
        include: [
            {
                model: sequelize.models.Contract,
                include: [
                    {
                        model: sequelize.models.Profile,
                        as: "Contractor",
                        where: {type: "contractor"},
                        attributes: ["profession"],
                    },
                ],
            },
        ],
    });

    if (jobsGrouped.length == 0)
        return {
            success: false,
            error: "no jobs found within supplied time period",
        };
    return {
        success: true,
        data: {
            profession: jobsGrouped[0].Contract.Contractor.profession,
            amount: jobsGrouped[0].get().total,
        },
    };
};

const findBestClients = async (start, end, limit = 2) => {
    let result = await sequelize.models.Job.findAll({
        attributes: [[sequelize.fn("sum", sequelize.col("price")), "paid"]],
        order: [[sequelize.fn("sum", sequelize.col("price")), "DESC"]],
        group: ["Contract.Client.id"],
        limit: limit,
        where: {
            paymentDate: {
                [Op.between]: [start, end],
            },
            paid: true,
        },
        include: [
            {
                model: sequelize.models.Contract,
                include: [
                    {
                        model: sequelize.models.Profile,
                        as: "Client",
                        where: {type: "client"},
                        attributes: ["id", "firstName", "lastName"],
                    },
                ],
            },
        ],
    });

    if (result.length == 0)
        return {
            success: false,
            error: "no jobs found within supplied time period",
        };

    return {
        success: true,
        data: result.map((jobs) => ({
            paid: jobs.paid,
            id: jobs.Contract.Client.id,
            fullName: `${jobs.Contract.Client.firstName} ${jobs.Contract.Client.lastName}`,
        })),
    };
};

module.exports = {
    findBestProfession,
    findBestClients,
};
