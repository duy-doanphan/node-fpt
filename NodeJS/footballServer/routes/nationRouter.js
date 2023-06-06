const express = require("express");
const bodyParser = require("body-parser");

const nationRouter = express.Router();
nationRouter.use(bodyParser.json());

nationRouter.route("/")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;
        res.end('Will send all the nations to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the nation: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /nations');
    })
    .delete((req, res, next) => {
        res.end('Deleting all nations');
    });

nationRouter.route("/:nationId")
    .get((req, res, next) => {
        res.end('Will send details of the nation: ' + req.params.nationId + ' to you!');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported on /nations/" + req.params.nationId);
    })
    .put((req, res, next) => {
        res.write('Updating the nation: ' + req.params.nationId + '\n');
        res.end('Will update the nation: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting nation: ' + req.params.nationId);
    });

module.exports = nationRouter;
