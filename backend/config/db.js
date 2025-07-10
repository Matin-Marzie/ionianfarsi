import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
    try {
      const connection = await pool.getConnection();
      console.log('✅ Server connected to database');
      connection.release();
    } catch (error) {
      console.error('❌ Database connection failed:', error);
    }
  }
  
  testConnection();
  

export default pool;