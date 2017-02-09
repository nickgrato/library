//init express
var express = require ('express');
var app = express();

//use port 5000 or use port designated in nodemon
var port = process.env.PORT || 5000;



//static file directory
app.use(express.static('public'));

//Config
app.set('views','./src/views');
app.set('view engine', 'ejs');

//Routing
app.get('/', function(req, res){
    res.render('index', {title: 'Hello from render', list:['a','b']});
});
app.get('/books', function(req, res){
    res.send('Jello books');
});

//Server 
app.listen(port, function(err){
    console.log('running server on port ' + port);
});