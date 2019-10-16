let mongoose = require('mongoose'); //allows access to mongoose
let actorSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },

    bYear: {
        validate: {
            validator: function(newAge){
                if (Number.isInteger(newAge))
                return true;
                else return false
            }, //Number.isInteger
            message: 'Birth year should be an integer'
        },
        type: Number,
        required: true
    },

    movies: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Movie'
    }]
});

module.exports = mongoose.model('Actor', actorSchema);