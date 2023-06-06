const express = require("express");
const bodyParser = require("body-parser");

const playerRouter = express.Router();
playerRouter.use(bodyParser.json());

playerRouter.route("/")
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        next();
    })
    .get((req, res, next) => {
        res.statusCode = 200;
        res.end('Will send all the players to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the player: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /players');
    })
    .delete((req, res, next) => {
        res.end('Deleting all players');
    });

playerRouter.route("/:playerId")
    .get((req, res, next) => {
        res.end('Will send details of the player: ' + req.params.playerId + ' to you!');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported on /players/" + req.params.playerId);
    })
    .put((req, res, next) => {
        res.write('Updating the player: ' + req.params.playerId + '\n');
        res.end('Will update the player: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .delete((req, res, next) => {
        res.end('Deleting player: ' + req.params.playerId);
    });

module.exports = playerRouter;
