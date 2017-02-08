var express = require ('express');

var app = express();

var port = process.env.PORT || 5000;

console.log(process); 

//static file directory
app.use(express.static('public'));
app.use(express.static('src/views'));



app.get('/', function(req, res){
    res.send('Jello World');
});

app.get('/books', function(req, res){
    res.send('Jello books');
});

app.listen(5000, function(err){
    console.log('running server on port ' + port);
});