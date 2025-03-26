// Filename: config/db.js

import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool ({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 5432, //added default port if .env is not set

    // additional configuration info
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});


pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const connectToDatabase = async () => {
    try {
        const client = await pool.connect();
        console.log(`Successful Connection to PostgresSQL Database: ${process.env.DB_NAME} as user: ${process.env.DB_USER}`);
        client.release();
    } catch (err) {
        console.error('Error connecting to the database', err);
    }
};

export const query = async (text, params) => {
    try {
        return await pool.query(text, params);
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    }
};

export default pool;
