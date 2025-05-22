const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const WebviewModule = sequelize.define('WebviewModule', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  url: DataTypes.STRING,
  username: DataTypes.STRING,
  menuName: DataTypes.STRING,
  subMenuName: DataTypes.STRING,
  integrationStatus: DataTypes.STRING,
  eligibilityStatus: DataTypes.STRING,
  activeStatus: DataTypes.STRING,
}, {
  tableName: 'webview_modules',
  timestamps: false,
});

module.exports = WebviewModule;
