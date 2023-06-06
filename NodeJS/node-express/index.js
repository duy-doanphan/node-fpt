const express = require('express'),
    http = require('http');
const morgan = require('morgan');
const nationRouter = require('./routes/nationRouter');
const playerRouter = require("./routes/playerRouter");

const hostname = 'localhost';
const port = 5000;
const app = express();
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use("/nations", nationRouter);
app.use("/players", playerRouter);

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
