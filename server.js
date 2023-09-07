const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const app = express();
const hostname='0.0.0.0'
const port = 3000;

const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

app.post("/pickRandomCandidate", upload.single("excelFile"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const candidates = xlsx.utils.sheet_to_json(worksheet);

    if (candidates.length === 0) {
        return res.json({ candidate: null });
    }

    const randomIndex = Math.floor(Math.random() * candidates.length);
    const randomCandidate = candidates[randomIndex];

    res.json({ candidate: randomCandidate });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
