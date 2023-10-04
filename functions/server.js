const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json());

// app.get('/', (req, res) => {
//    res.json({status: "ok"});
// });


app.use(express.static('public'));
app.use(cors({
      origin: "*",
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization'],
  }));
app.use('/api/user', require('./routes/user_routes.js'));
app.use('/api/post', require('./routes/post_routes.js'));

module.exports = app;