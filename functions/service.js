require('dotenv').config();
const app = require('./server.js');
const bodyParser = require('body-parser')
const cors = require('cors')
let favicon = require('serve-favicon');
let path = require('path');

const PORT = process.env.PORT || 3000
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.json());
app.use(cors());




app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});
