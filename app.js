/**
 * Module dependencies
 */
var express = require('express');
var http = require('http');
var path = require('path');

var routes = require('./routes');
var config = require('./config');

var app = express();

// all environments
app.set('port', config.port);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// base path for the application
var basePath = '/';		// default base-path
if (config.generateRandomBasePath) {
  var randomString = Math.floor((1 + Math.random()) * 0x100000000).toString(16).substring(1);	// 8-digit random hex-number
  basePath = '/' + randomString;
} else if (config.basePath) {
  basePath = config.basePath;
}

// upload path
var uploadPath = basePath;
if (uploadPath.charAt(uploadPath.length - 1) != '/') {
  uploadPath += '/';
}
uploadPath += 'doUpload';

// Routes
app.get(basePath, routes.index);
routes.uploadPath = uploadPath;
app.post(uploadPath, routes.doUpload);

// start server
http.createServer(app).listen(app.get('port'), function(){
  var port = app.get('port');
  console.log('Express server listening on port ' + port + '; application path: ' + 'http://127.0.0.1:' + port + basePath);
});
