const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const IntegrationModel = sequelize.define('Integration', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    menuName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = IntegrationModel;