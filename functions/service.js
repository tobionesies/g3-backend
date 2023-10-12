require('dotenv').config();
const app = require('./server.js');
const bodyParser = require('body-parser')
let favicon = require('serve-favicon');
let path = require('path');
const express = require('express');
const isAuthenticated = require('./middleware')

const PORT = process.env.PORT || 3000
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
//app.use(bodyParser.json({ type: 'application/*+json' }))
//app.use(bodyParser.raw({ type: 'multipart/form-data' }))
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});
