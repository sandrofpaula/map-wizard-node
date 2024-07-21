const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../config/db.json');

const getData = () => {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
};

const saveData = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

module.exports = {
    findAll: () => getData().mapas,
    findOne: (id) => getData().mapas.find(mapa => mapa.id === parseInt(id)),
    saveAll: (mapas) => {
        const data = getData();
        data.mapas = mapas;
        saveData(data);
    },
    getApiKey: () => getData().google_api_key,
    setApiKey: (key) => {
        const data = getData();
        data.google_api_key = key;
        saveData(data);
    }
};
