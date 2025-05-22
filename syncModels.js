const sequelize = require('./src/config/sequelize');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize connection established successfully.');
    await sequelize.sync(); // Use { alter: true } for dev auto-migration
    console.log('All models were synchronized successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();
