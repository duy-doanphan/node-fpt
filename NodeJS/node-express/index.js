const express = require('express'),
    http = require('http');

const hostname = 'localhost';
const port = 5000;
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const nationRouter = require('./routes/nationRouter');
app.use('/nations', nationRouter);


// app.all('/nations', (req, res, next) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     next();
// });
//
// app.get('/nations', (req, res, next) => {
//     res.end('Will send all the nations to you!');
// });
//
// app.post('/nations', (req, res, next) => {
//     res.end('Will add the nation: ' + req.body.name + ' with details: ' + req.body.description);
// });
//
// app.put('/nations', (req, res, next) => {
//     res.statusCode = 403;
//     res.end('PUT operation not supported on /nations');
// });
//
// app.delete('/nations', (req, res, next) => {
//     res.end('Deleting all nations');
// });
//
// app.get('/nations/:nationId', (req, res, next) => {
//     res.end('Will send details of the nation: ' + req.params.nationId + ' to you!');
// });
//
// app.post('/nations/:nationId', (req, res, next) => {
//     res.statusCode = 403;
//     res.end('POST operation not supported on /nations/' + req.params.nationId);
// });
//
// app.put('/nations/:nationId', (req, res, next) => {
//     res.write('Updating the nation: ' + req.params.nationId + '\n');
//     res.end('Will update the nation: ' + req.body.name +
//         ' with details: ' + req.body.description);
// });
//
// app.delete('/nations/:nationId', (req, res, next) => {
//     res.end('Deleting nation: ' + req.params.nationId);
// });


app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
