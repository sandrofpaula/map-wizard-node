const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../config/db.json');
const config = require(configPath);
const mapasData = config.mapas;

function setApiKey(apiKey) {
    config.google_api_key = apiKey;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

function getApiKey() {
    return config.google_api_key;
}

exports.index = (req, res) => {
    res.render('index', {
        mapas: mapasData,
        google_api_key: res.locals.google_api_key
    });
};

exports.view = (req, res) => {
    const mapa = mapasData.find(m => m.id === parseInt(req.params.id));
    if (!mapa) return res.status(404).send('Mapa não encontrado');
    res.render('view', { 
        mapa, 
        google_api_key: res.locals.google_api_key 
    });
};

exports.create = (req, res) => {
    if (req.method === 'POST') {
        const { nome, endereco, localizacao } = req.body;
        const id = mapasData.length ? mapasData[mapasData.length - 1].id + 1 : 1;
        mapasData.push({ id, nome, endereco, localizacao });
        // Salvar os dados atualizados no arquivo JSON
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        return res.redirect('/');
    }
    res.render('create', {
        google_api_key: res.locals.google_api_key
    });
};

exports.edit = (req, res) => {
    const mapa = mapasData.find(m => m.id === parseInt(req.params.id));
    if (!mapa) return res.status(404).send('Mapa não encontrado');
    if (req.method === 'POST') {
        mapa.nome = req.body.nome;
        mapa.endereco = req.body.endereco;
        mapa.localizacao = req.body.localizacao;
        // Salvar os dados atualizados no arquivo JSON
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
        return res.redirect('/');
    }
    res.render('edit', { 
        mapa, 
        google_api_key: res.locals.google_api_key 
    });
};

exports.delete = (req, res) => {
    const index = mapasData.findIndex(m => m.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send('Mapa não encontrado');
    mapasData.splice(index, 1);
    // Salvar os dados atualizados no arquivo JSON
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    res.redirect('/');
};

exports.editApiKey = (req, res) => {
    if (req.method === 'POST') {
        setApiKey(req.body.google_api_key);
        return res.redirect('/');
    }
    const apiKey = getApiKey();
    res.render('apiKey', { apiKey });
};
