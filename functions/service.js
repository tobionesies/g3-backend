require('dotenv').config();
const app = require('./server.js');
const bodyParser = require('body-parser')
let favicon = require('serve-favicon');
let path = require('path');
const isAuthenticated = require('./middleware')

const PORT = process.env.PORT || 3000
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json({extend:false}));
app.use(isAuthenticated.isAuthenticated)

app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});
