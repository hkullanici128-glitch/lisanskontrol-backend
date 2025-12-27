const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Site kontrol endpoint
app.post("/check", (req, res) => {
  const { url } = req.body;
  db.get("SELECT * FROM licenses WHERE url = ?", [url], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.json({
      licenseStatus: "unknown",
      licenseProvider: "Bilinmiyor",
      riskLevel: "medium"
    });
    res.json(row);
  });
});

// Admin panelinden site ekleme/güncelleme endpoint
app.post("/add-license", (req, res) => {
  const { url, licenseStatus, licenseProvider, riskLevel } = req.body;

  if (!url || !licenseStatus || !licenseProvider || !riskLevel) {
    return res.status(400).json({ error: "Tüm alanlar doldurulmalı!" });
  }

  db.run(
    `INSERT OR REPLACE INTO licenses (url, licenseStatus, licenseProvider, riskLevel) VALUES (?, ?, ?, ?)`,
    [url, licenseStatus, licenseProvider, riskLevel],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: `${url} başarıyla eklendi/güncellendi!` });
    }
  );
});

app.listen(5000, () => console.log("Backend çalışıyor: http://localhost:5000"));
