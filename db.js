// db.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./licenses.db");

// Tabloyu oluştur (eğer yoksa)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS licenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    url TEXT UNIQUE,
    licenseStatus TEXT,
    licenseProvider TEXT,
    riskLevel TEXT
  )`);
});

module.exports = db;
