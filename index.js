var {fortunes} = require('./data');
var express = require('express');
var app = express();
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
 res.render('home');
});
app.get('/about', function(req, res){
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune : randomFortune});
});
// custom 404 page
app.use(function(req, res){
    res.status(400)
    res.render('404');
});
// custom 500 page
app.use(function(err, req, res, next){
    res.status(500)
    console.error(err.stack);
    res.render('500')
});
app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});