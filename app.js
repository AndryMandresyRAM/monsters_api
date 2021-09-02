const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use('/', routes)

app.use(cors({
    origin: ["http://localhost:8081"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use((err, req, res, next)=> {
    res.json(err);
});

module.exports = app;