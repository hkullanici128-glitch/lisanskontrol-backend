const db = require("./db");           // db.js’i import et
const licenses = require("./licenses.json"); // licenses.json’u oku

licenses.forEach(site => {
  db.run(
    `INSERT OR REPLACE INTO licenses (url, licenseStatus, licenseProvider, riskLevel) VALUES (?, ?, ?, ?)`,
    [site.url, site.licenseStatus, site.licenseProvider, site.riskLevel],
    err => {
      if (err) console.error(`Hata: ${site.url} -> ${err.message}`);
      else console.log(`Başarıyla eklendi/güncellendi: ${site.url}`);
    }
  );
});
