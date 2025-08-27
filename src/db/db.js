import mysql from "mysql2/promise";
// import dotenv from 'dotenv';
// dotenv.config();

let connection;

const connectDB = async () => {
  try {
    if (!connection) {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
      });
      await connection.query(`CREATE TABLE IF NOT EXISTS schools (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          latitude FLOAT NOT NULL,
          longitude FLOAT NOT NULL
          )`);
      console.log("MySQL connected || DB Host:", connection.config.host);
    }
    return connection;
  } catch (error) {
    console.error("MySQL connection error:", error);
    process.exit(1);
  }
};

export { connection, connectDB };
