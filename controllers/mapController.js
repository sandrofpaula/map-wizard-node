const Map = require('../models/mapModel');

module.exports = {
    index: (req, res) => {
        const mapas = Map.findAll();
        const apiKey = Map.getApiKey();
        res.render('index', { mapas, apiKey });
    },
    view: (req, res) => {
        const mapa = Map.findOne(req.params.id);
        const apiKey = Map.getApiKey();
        res.render('view', { mapa, apiKey });
    },
    create: (req, res) => {
        if (req.method === 'POST') {
            const mapas = Map.findAll();
            const newId = mapas.length ? mapas[mapas.length - 1].id + 1 : 1;
            const novoMapa = {
                id: newId,
                nome: req.body.nome,
                endereco: req.body.endereco,
                localizacao: req.body.localizacao
            };
            mapas.push(novoMapa);
            Map.saveAll(mapas);
            return res.redirect('/');
        }
        const apiKey = Map.getApiKey();
        res.render('create', { apiKey });
    },
    edit: (req, res) => {
        const mapa = Map.findOne(req.params.id);
        if (req.method === 'POST') {
            mapa.nome = req.body.nome;
            mapa.endereco = req.body.endereco;
            mapa.localizacao = req.body.localizacao;
            const mapas = Map.findAll().map(m => m.id === mapa.id ? mapa : m);
            Map.saveAll(mapas);
            return res.redirect('/');
        }
        const apiKey = Map.getApiKey();
        res.render('edit', { mapa, apiKey });
    },
    delete: (req, res) => {
        const mapas = Map.findAll().filter(mapa => mapa.id !== parseInt(req.params.id));
        Map.saveAll(mapas);
        res.redirect('/');
    },
    editApiKey: (req, res) => {
        if (req.method === 'POST') {
            Map.setApiKey(req.body.google_api_key);
            return res.redirect('/');
        }
        const apiKey = Map.getApiKey();
        res.render('apiKey', { apiKey });
    }
};
