const express = require('express');
const leaderRouter  = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Leaders = require('../models/leaders');
const { router } = require('../app');
var authenticate = require('../authenticate');


leaderRouter.use(bodyParser.json());

// Create, Read, Delete => leader
leaderRouter.route('/')
    .get((req,res,next) => {
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser,(req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                console.log('Leader Created ', leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Leaders');
    })

    .delete(authenticate.verifyUser,(req, res, next) => {
        Leaders.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//Create, Read, Delete => leader by Id
leaderRouter.route('/:leaderId')
    .get((req,res,next) => {
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Leaders' + req.params.leaderId);

    })

    .put(authenticate.verifyUser,(req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true})
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete(authenticate.verifyUser,(req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = leaderRouter;

// leaderRouter.route('/:leaderId/comments')
//     .get((req, res, next) => {
//         Leaders.findById(req.params.leaderId)
//             .then((leader) => {
//                 if (leader != null) {
//                     res.statusCode = 200;
//                     res.setHeader('Content-type', 'application/json');
//                     res.json(leader.comments);
//                 } else {
//                     err = new Error('leader ' + req.params.leaderId + 'not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     })
//     .post((req, res, next) => {
//         Leaders.findById(req.params.leaderId)
//             .then((leader) => {
//                 if (leader != null) {
//                     leader.comments.push(req.body);
//                     leader.save()
//                         .then((leader) => {
//                             res.statusCode = 200;
//                             res.setHeader('Content-type', 'application/json');
//                             res.json(leader.comments);
//                         }, (err) => next(err));
//                 } else {
//                     err = new Error('leader ' + req.params.leaderId + 'not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     })
//     .put((req, res, next) => {
//         res.statusCode = 403;
//         res.end('PUT operation not support on /Leaders/' + req.params.leaderId + '/comments');

//     })
//     .delete((req, res, next) => {
//         Leaders.findById(req.params.leaderId)
//             .then((leader) => {
//                 if (leader != null) {
//                     for (var i = (leader.comments.length - 1); i >= 0; i--) {
//                         leader.comments.id(leader.comments[i]._id).remove();
//                     }
//                     leader.save()
//                         .then((leader) => {
//                             res.statusCode = 200;
//                             res.setHeader('Content-type', 'application/json');
//                             res.json(leader.comments);
//                         }, (err) => next(err));
//                 } else {
//                     err = new Error('leader ' + req.params.dishId + 'not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     });

// leaderRouter.route('/:leaderId/comments/:commentId')
//     .get((req, res, next) => {
//         Leaders.findById(req.params.leaderId)
//             .then((leader) => {
//                 if (leader != null && leader.comments.id(req.params.commentId) != null) {
//                     res.statusCode = 200;
//                     res.setHeader('Content-type', 'application/json');
//                     res.json(leader.comments.id(req.params.commentId));
//                 } else if (leader == null) {
//                     err = new Error('leader ' + req.params.dishId + 'not found');
//                     err.status = 404;
//                     return next(err);
//                 } else {
//                     err = new Error('leader ' + req.params.commentId + 'not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     })
//     .post((req, res, next) => {
//         res.statusCode = 403;
//         res.end('POST operation not supported on /Leaders/' + req.params.leaderId + '/comments/' + req.params.commentId);
//     })
//     .put((req, res, next) => {
//         Leaders.findById(req.params.leaderId)
//             .then((leader) => {
//                 if (leader != null && leader.comments.id(req.params.commentId) != null) {
//                     if (req.params.rating) {
//                         leader.comments.id(req.params.commentId).rating = req.body.rating;
//                     }
//                     if (req.params.comment) {
//                         leader.comments.id(req.params.commentId).comment = req.body.comment;
//                     }
//                     leader.save()
//                         .then((leader) => {
//                             res.statusCode = 200;
//                             res.setHeader('Content-Type', 'application/json');
//                             res.json(leader);
//                         }, (err) => next(err));
//                 } else if (leader == null) {
//                     err = new Error('leader ' + req.params.leaderId + 'not found');
//                     err.status = 404;
//                     return next(err);
//                 } else {
//                     err = new Error('leader ' + req.params.commentId + 'not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));

//     })
//     .delete((req, res, next) => {
//         Leaders.findById(req.params.leaderId)
//             .then((leader) => {
//                 if (leader != null && leader.comments.id(req.params.commentId) != null) {

//                     leader.comments.id(req.params.commentId).remove;
//                     leader.save()
//                         .then((leader) => {
//                             res.statusCode = 200;
//                             res.setHeader('Content-Type', 'application/json');
//                             res.json(leader);
//                         }, (err) => next(err));
//                 } else if (leader == null) {
//                     err = new Error('leader ' + req.params.dishId + 'not found');
//                     err.status = 404;
//                     return next(err);
//                 } else {
//                     err = new Error('leader ' + req.params.commentId + 'not found');
//                     err.status = 404;
//                     return next(err);
//                 }
//             }, (err) => next(err))
//             .catch((err) => next(err));
//     });


