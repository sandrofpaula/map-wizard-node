const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mapRoutes = require('./routes/mapRoutes');
const config = require('./config/db.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para verificar a Google API Key
app.use((req, res, next) => {
    const googleApiKey = config.google_api_key || "YOUR_GOOGLE_API_KEY";
    res.locals.google_api_key = googleApiKey;
    next();
});

app.use('/', mapRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} http://localhost:${PORT}/`));
