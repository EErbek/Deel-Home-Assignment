const sequelize = require("./../models");
const { Op } = require("sequelize");

const addBalance = async (id, amount) => {
  const t = await sequelize.transaction();
  try {
    const client = await sequelize.models.Profile.findOne({where: {id:id}}, {transaction:t});
    if(!client) throw new Error("Client not found")
    
    const unpaidSumFilter = {
      where: {
        paid: { [Op.not]: true },
      },
      include: [
        {
          model: sequelize.models.Contract,
          required: true,
          where: {
            [Op.or]: [{ ClientId: id }],
            status: "in_progress",
          },
        },
      ],
    };

    const unpaidJobsSum = await sequelize.models.Job.sum('price', unpaidSumFilter, {transaction: t});
    const depositLimit = unpaidJobsSum * 0.25;
    // ? deposit amount cannot be more than %25 of unpaid or total balance cannot exceed the %25?
    if( amount > depositLimit )
    throw new Error("Amount is over the allowed deposit limit of "+ depositLimit.toFixed(2))
    console.log(unpaidJobsSum)
    
    await client.increment('balance', {by: amount}, {transaction:t})
    await client.reload();

    await t.commit();
    return {success: true, data: client}
  } catch (error) {
    await t.rollback;
    return {success: false, error: error.message}
  }
};

module.exports = {
  addBalance
};
