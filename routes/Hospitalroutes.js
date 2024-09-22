const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const dataPath = path.join(__dirname, '../hospitals.json');

// Helper function to read and write to JSON file
const readData = () => JSON.parse(fs.readFileSync(dataPath));
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));

// GET all hospitals
router.get('/hospitals', (req, res) => {
    const hospitals = readData();
    res.send(hospitals);
});

// POST a new hospital
router.post('/add', (req, res) => {
    const newHospital = req.body;
    const hospitals = readData();
    newHospital.id = hospitals.length ? hospitals[hospitals.length - 1].id + 1 : 1;
    hospitals.push(newHospital);
    writeData(hospitals);
    res.send('Hospital added');
});

// PUT to update a hospital
router.put('/edit/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const updatedHospital = req.body;
    const hospitals = readData();
    const index = hospitals.findIndex(h => h.id === id);
    hospitals[index] = { id, ...updatedHospital };
    writeData(hospitals);
    res.send(hospitals);
});

// DELETE a hospital
router.delete('/remove/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const hospitals = readData();
    const filteredHospitals = hospitals.filter(hospital => hospital.id !== id);
    writeData(filteredHospitals);
    res.send(filteredHospitals);
});

module.exports = router;