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
if(fs.existsSync("../config/certs/")){
  console.log("found certs folder, will use ssl");
 server = require('greenlock-express').create({
 
  // Let's Encrypt v2 is ACME draft 11
  version: 'draft-11'
 
  // Note: If at first you don't succeed, switch to staging to debug
  // https://acme-staging-v02.api.letsencrypt.org/directory
, server: 'https://acme-v02.api.letsencrypt.org/directory'
 
  // Where the certs will be saved, MUST have write access
, configDir: '../config/certs/'
 
  // You MUST change this to a valid email address
, email: 'mdjudge@gmail.com'
 
  // You MUST change these to valid domains
  // NOTE: all domains will validated and listed on the certificate
, approvedDomains: ['drive.markjudge.co.uk' ]
 
  // You MUST NOT build clients that accept the ToS without asking the user
, agreeTos: true
 
, app: app
 
  // Join the community to get notified of important updates
, communityMember: true
 
  // Contribute telemetry data to the project
, telemetry: true
 
//, debug: true
 
}).listen(80, 443);
}else{
  console.log("Couldn't find certs folder, won't use ssl")
  //Local dev, none ssl
  server = app.listen(80);
}
console.log('Home automation server started on: ' + port);


var webSock = require('./websocket')(lwClient,server)