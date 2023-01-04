const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('Job', {
        description: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        price:{
          type: DataTypes.DECIMAL(12,2),
          allowNull: false
        },
        paid: {
          type: DataTypes.BOOLEAN,
          default:false
        },
        paymentDate:{
          type: DataTypes.DATE
        }
      });
};