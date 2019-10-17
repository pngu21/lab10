// refs to required packages
let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let path = require('path');


//refs to the routers
let actors = require('./routers/actor');
let movies = require('./routers/movie');
let url = "mongodb://localhost:27017/wlab8";

//instance to configure express
let app = express();
app.listen(8080);
console.log('Server running at http://localhost:8080');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/", express.static(path.join(__dirname,"dist/movieAng")));

//mongoose to connect to the database
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}, function(err){
    if(err){
        return console.log('Mongoose connection error:', err);
    }
    console.log('Connect Successfully');
});
/*mongoose.connect(`mongodb://${process.env.MONGOUSER}:${process.env.MONGOPASSWORD}@pydow-shard-00-00-15jok.mongodb.net:27017,pydow-shard-00-01-15jok.mongodb.net:27017,pydow-shard-00-02-15jok.mongodb.net:27017/PydowDatabase?ssl=true&replicaSet=Pydow-shard-0&authSource=admin&retryWrites=true`,{
useNewUrlParser: true, useUnifiedTopology: true
}, function(error){console.log(error)});*/

//Config Endpoints
//Actor RESTful endpoints
//CRUD
app.get('/actors', actors.getAll);//task 7 actor routes+
app.post('/actors', actors.createOne);

app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.put('/actors/:actId/:movId', actors.removeMovie);// task 3
app.post('/actors/:id/:movId', actors.addMovie);//

app.delete('/actors/:actId', actors.deleteActor);//task 2
app.delete('/actors/:id', actors.deleteOne);
//app.delete('/actors/:actId/:movId', actors.removeMovie);//


//Movie RESTful endpoint
app.get('/movies', movies.getAll);//task 8 movie routes+
app.post('/movies', movies.createOne);

app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.put('/movies/:movId/:actId', movies.removeActor)//task 4

app.delete('/movies/:id', movies.deleteOne);//task 1+
//app.delete('/movies/:movId/:actId', movies.removeActor);//
app.post('/movies/:movName/:actorName', movies.addActor);//task 5+
app.get('/movies/:year1/:year2', movies.getAllYear);//task 6+
app.delete('/movies/year/:year', movies.removeMovies);
