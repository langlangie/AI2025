const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
    rejectUnauthorized: false, // WAJIB untuk Azure
  },
});

const connectDB = async () => {
    try {
        await pool.connect();
        console.log('Connected to the PostgreSQL database');
    } catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};

module.exports = {
    pool,
    connectDB,
};