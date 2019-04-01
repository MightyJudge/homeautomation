'use strict';



//Living Room 192.168.0.21
//bedroom 192.168.0.25

const express = require('express')
const fs = require('fs')
const https = require('https')
const http = require('http')
const app = express()
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
  res.send('Hi')
})
http.createServer(app).listen(80, () => {
  console.log('Listening...')
})
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



app.use(express.static(__dirname + '/static', { dotfiles: 'allow' } ))
if (fs.existsSync('/etc/letsencrypt/live/drive.markjudge.co.uk/privkey.pem')) {
  https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/drive.markjudge.co.uk/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/drive.markjudge.co.uk/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/drive.markjudge.co.uk/chain.pem')
  }, app).listen(443, () => {
    console.log('Listening...')
  });

}

/*
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



  server = app.listen(80);

*/


