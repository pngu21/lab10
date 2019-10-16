let mongoose = require('mongoose');

let Actor = require('../models/actor');
let Movie = require('../models/movie');

module.exports = {
    getAll: function (req, res) {
        Actor.find({}).populate('movies').exec(function(err, actor) {
            if (err) {
                return res.status(404).json(err);
            } else {
                res.json(actor);
            }
        }); //task 7
    },

    createOne: function(req, res){
        let newActorDetails = req.body;
        newActorDetails._id = new mongoose.Types.ObjectId();
        Actor.create(newActorDetails, function(err, actor){
            if(err) return res.status(400).json(err);

            res.json(actor);
        });
    },

    getOne: function (req, res) {
        let actorID = new mongoose.Types.ObjectId(req.params.id);
        Actor.findOne({ _id: actorID })
            .populate('movies')
            .exec(function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                res.json(actor);
            });
    },

    updateOne: function (req, res) {
        let actorID = new mongoose.Types.ObjectId(req.params.id);
        Actor.findOneAndUpdate({ _id: actorID }, req.body, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            res.json(actor);
        });
    },

    deleteOne: function (req, res) {
        let actorID = new mongoose.Types.ObjectId(req.params.id);
        Actor.findOneAndDelete({ _id: actorID}, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },

    deleteActor: function(req, res){
        //let movieID = new mongoose.Types.ObjectId(req.params.id);
        //let actorID = new mongoose.Types.ObjectId(req.params.actId);

        Actor.findOneAndRemove({_id: new mongoose.Types.ObjectId(req.params.actId) }, function(err, actor){
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.deleteMany({actors: req.params.actId }, function(err, movie){
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(actor);
            });
        });
    },

    addMovie: function (req, res) {
        let movieID = new mongoose.Types.ObjectId(req.params.movId);
        let actorID = new mongoose.Types.ObjectId(req.params.id);

        Actor.findOne({ _id: actorID }, function (err, actor) {
            if (err) return res.status(400).json(err);
            if (!actor) return res.status(404).json();
            Movie.findOne({ _id: movieID }, function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.push(movie._id);
                actor.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            })
        });//
    },

    removeMovie: function(req, res){
        let movieID = new mongoose.Types.ObjectId(req.params.movId);
        let actorID = new mongoose.Types.ObjectId(req.params.actId);

        Movie.findOne({_id: movieID }, function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({_id: actorID }, function(err, actor){
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                actor.movies.remove(movie._id);
                actor.save(function(err){
                    if (err) return res.status(500).json(err);
                    res.json(actor);
                });
            });
        });//task 3
    }

};
