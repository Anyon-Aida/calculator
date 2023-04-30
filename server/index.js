const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;

// JSON adatokat várunk
app.use(express.json());

// Engedélyezzük a Cross-Origin Resource Sharing-ot (CORS)
app.use(cors({origin: '*'}));

// Kezdőoldal
app.get('/', (req, res) => {
    res.send('Kezdőoldal')
})

// Adatok mentése a szerverre
app.post('/save', (req, res) => {
    const value = req.body;

    // Az érték mentése a memóriába
    fs.writeFile('memory.txt', value.calc.toString(), (err) => {
        if (err) throw err;
        res.send('Sikeres mentés');
    });
})

// Adatok betöltése a szerverről
app.get('/load', (req, res) => {
    // A memóriából való adatok olvasása
    fs.readFile('memory.txt', (err, data) => {
        if (err) throw err;
        res.send(data);
    });
})

// A szerver elindítása
app.listen(port, () => {
    console.log(`A szerver fut a ${port}-es porton`);
});
