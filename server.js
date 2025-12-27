const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(cors()); // Tüm originlere izin
app.use(bodyParser.json());

let licenses = {};
// Lisansları JSON dosyasından yükle
if (fs.existsSync("licenses.json")) {
  licenses = JSON.parse(fs.readFileSync("licenses.json"));
}

app.post("/check", (req, res) => {
  const url = req.body.url;
  if (!url) return res.status(400).json({ error: "URL girilmedi" });

  const licenseData = licenses[url] || {
    licenseStatus: "valid",
    licenseProvider: "Resmi Sağlayıcı",
    riskLevel: "low"
  };

  res.json(licenseData);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Render’da çalışıyor: http://localhost:${PORT}`));
