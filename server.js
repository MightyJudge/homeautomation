'use strict';
var fs = require('fs')
var express = require('express'),
  app = express(),
  port = process.env.PORT || 80,
  bodyParser = require('body-parser');


app.use(bodyParser.json());

var tvRoutes = require('./api/routes/tvRoutes'); 
tvRoutes(app); //register the route


var config = require('./config/config.json');
var Client = require('./api/controllers/lightwaveClient').Client;
var lwClient = new Client();

var lwRoutes = require('./api/routes/lwRoutes');
lwRoutes(app,lwClient); //register the route
//catch all other get calls within the api folder
app.get('/api', function(req, res, next) {
	res.send(404,'{"Message:":"Api call not valid"}');
});
app.get('/api/*', function(req, res, next) {
	res.send(404,'{"Message:":"Api call not valid"}');
});

//host the dashboard
const path = require('path');
var dashdir = path.join(__dirname, 'dashboard');
app.use(express.static(dashdir,{setHeaders:function(res,p){
  if(p==path.join(dashdir, 'service-worker.js')){
    res.setHeader('Cache-Control', 'no-cache');
  
  }
}}));
//Anything that doesn't match something else should go to the dasboard index page

app.get('*', function(req, res, next) {
   res.sendFile(__dirname + '/dashboard/index.html');
});
var server={};

  server = app.listen(80);

console.log('Home automation server started on: ' + port);


var webSock = require('./websocket')(lwClient,server)