const express = require('express');
const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//    res.json({status: "ok"});
// });

app.use('/api/user', require('./routes/user_routes.js'));

module.exports = app;