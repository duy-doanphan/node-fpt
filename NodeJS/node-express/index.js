const express = require('express'),
    http = require('http');

const hostname = 'localhost';
const port = 5000;
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

const nationRouter = require('./routes/nationRouter');
app.use("/nations", nationRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
