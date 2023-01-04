const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('Profile',  {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        profession: {
          type: DataTypes.STRING,
          allowNull: false
        },
        balance:{
          type:DataTypes.DECIMAL(12,2)
        },
        type: {
          type: DataTypes.ENUM('client', 'contractor')
        }
      });
};