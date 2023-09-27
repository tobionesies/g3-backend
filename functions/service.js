require('dotenv').config();
const app = require('./server.js');
let favicon = require('serve-favicon');
let path = require('path');

const PORT = process.env.PORT || 3000
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.listen(PORT, () => {
    console.log(`http server listening on port ${PORT}`)
});
