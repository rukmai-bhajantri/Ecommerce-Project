const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect((err) => {
    if (err) {
        console.log("❌ DB ERROR:", err);
    } else {
        console.log("✅ DB Connected");
    }
});

module.exports = db;