
/**
 * Module dependencies.
 */


// libraries
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var lessMiddleware = require("less-middleware");
var mongoose = require('mongoose');


// Routes
var index = require('./routes/index');
var about = require('./routes/about');
var story = require('./routes/story');
var discover = require('./routes/discover');


// Connect to the Mongo database, whether locally or on Heroku
var local_database_name = 'stand-together';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Rekindle secret key'));
app.use(express.session());
app.use(express.bodyParser()); // WTF needs to go before app.router wtfomgfml
app.use(app.router);
app.use(lessMiddleware({
    src: __dirname + "/less/custom",
    dest: __dirname + "/public/css",
    // if you're using a different src/dest directory, you
    // MUST include the prefex, which matches the dest
    // public directory
    prefix: "/css",
    // force true recompiles on every request... not the
    // best for production, but fine in debug while working
    // through changes
    force: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ACTUAL URLS
app.locals.layout = './main.handlebars';
app.get('/', index.view);
app.get('/about', about.view);
app.get('/story/:id', story.view);
app.get('/story', story.new);
app.post('/story', story.create);
app.get('/story/show_support/:id', story.showSupport);
app.get('/search', discover.search);
app.get('/discover', discover.discover);


// Create server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});