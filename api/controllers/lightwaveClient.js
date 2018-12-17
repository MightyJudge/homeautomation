'use strict'
var events = require('events');
var WebSocket = require('ws');
var https = require('https');
var util = require('util');
const uuidv4 = require('uuid/v4');

var config = require('../../config/config.json');
var Client = function () {
    events.EventEmitter.call(this);
    this.requestId = 1;
    this.requests = {};
    this.accessToken="";
    this.refreshToken="";
    this.sessionId="";
    this.senderId="";
    this.clientId="";
    this.transactionId=1;
    this.rootGroupIds=[];
    this.devices={};
    this.features={};
    this.featureSet={};
};


events.EventEmitter.call(Client);
util.inherits(Client, events.EventEmitter);
Client.prototype.switch = function(device,status,cb){
    console.log("test switch");
}

Client.prototype.connect = function (cb) {
    if (cb) {
        var handler = function () {
            this.removeListener('connected', handler);
            this.removeListener('error', handler);
            this.removeListener('close', handler);

            cb();
        };

        this.on('connected', handler);
        this.on('error', handler);
        this.on('close', handler);
    }

    this.ws = new WebSocket("wss://v1-linkplus-app.lightwaverf.com/", {origin: "null"});

	
    this.ws.on('open', function () {
        console.log("opened");
        //Post call to get a token
        this.getAuthToken();
    }.bind(this));
    
    this.on('authready',function(){
        console.log("READY FOR AUTH");
    }.bind(this));

    this.ws.on('message', function (data) {
        console.log("Received message: " + data);

        var message = JSON.parse(data);

        var request = message.transactionId ? this.requests[message.transactionId] : null;
        
        if (message.direction === "response") {
            if (request) {
                if (request.callback && typeof request.callback === "function") {
                    request.callback(message);
                }

            }
        } if (message.direction === "response" && message.operation=="authenticate") {
            this.emit('connected');
        }
    }.bind(this));

    this.ws.on('error', function (err) {
        this.emit('error', err);
    }.bind(this));

    this.ws.on('close', function () {
        this.emit('close', 'connection closed');
    }.bind(this));

Client.prototype.getAuthToken = function(){
    var post_data = JSON.stringify({
        "email":config.lightwave.email,
        "password":config.lightwave.password,
        "version":"1.6.8"
     });
     
    var post_options = {
        host: 'auth.lightwaverf.com',
        path: 'https://auth.lightwaverf.com/v2/lightwaverf/autouserlogin/lwapps',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-lwrf-appid':'ios-01',
            'Content-Length': Buffer.byteLength(post_data)
        }
    };
    var cb = this.gotAuthToken;
    var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        
       res.on('data',cb);
    });
    post_req.write(post_data);
    post_req.end();
}.bind(this);
Client.prototype.gotAuthToken = function(chunk){

        var response = JSON.parse(chunk);
        this.accessToken = response.tokens.access_token;
           this.sessionId =  uuidv4();
           this.senderId =  uuidv4();
            this.clientId = uuidv4();
            this.send({
                "version":1,
                "senderId":this.sessionId,
                "transactionId":1,
                "direction":"request",
                "class":"user",
                "operation":"authenticate",
                "items":[
                   {
                      "itemId":0,
                      "payload":{
                         "token":this.accessToken,
                         "clientDeviceId":this.clientId
                      }
                   }
                ]
             },this.getUserInfo);
    }.bind(this);
    Client.prototype.getHierarchy = function(groupId,cb){
       var msg = {"version":1,"senderId":this.senderID,"class":"group","direction":"request","operation":"hierarchy","transactionId":1,"items":[{"itemId":"cjpmhy60100043b64680k8g0l","payload":{"groupId":groupId}}]}
       this.Send(msg,cb);
    }.bind(this);
Client.prototype.send = function (obj,cb) {
    obj.transactionId = this.transactionId++;
    obj.senderId = this.senderId;
    this.requests[obj.transactionId] = {callback: cb};
	try{
        var msg = JSON.stringify(obj);
        console.log("Sending:"+msg);
		this.ws.send(msg);
	}catch(e){
        console.log(e);
	}
}.bind(this);
Client.prototype.switch = function(device,on,cb){
    var msg = {"version":1,"senderId":this.senderId,"class":"feature","direction":"request","operation":"write","transactionId":1,"items":[{"itemId":"cjpfdtjmk00313b64li1xxlfa","payload":{"featureId":device,"value":on}}]}
    this.Send(msg,function(){cb();});
}.bind(this);
Client.prototype.getUserInfo = function(){
    var msg = {"version":1,"senderId":this.senderId,"class":"user","direction":"request","operation":"read","transactionId":1,"items":[{"itemId":"cjpeg9gfz00303b684e2cqg02","payload":{}}]};
    this.Send(msg,function(m){
            this.rootGroupIds = m.items[0].payload.rootGroupIds;
            console.log("GROUP ID's: "+ this.rootGroupIds);
            
            this.getDevicesInGroup(this.rootGroupIds[0]);
    }.bind(this))
}.bind(this);
Client.prototype.gotHierarchy = function(groups){
    var obj = {}
    var ds = {}
    
    for(var i=0;i<groups.items[0].payload.featureSet.length;i++){
        var f = groups.items[0].payload.featureSet[i];
        var d = {"name": {"id":f.groupId,name:f.name}};

        obj[f.groupId] = {"id":f.groupId,name:f.name};
        var validfeatures = 0;
        for(var x=0;x<f.features.length;x++){
            if(this.features.hasOwnProperty(f.features[x])){
                var feat = this.features[f.features[x]];
                d[feat.type] = {"id":f.features[x],value:""};
                validfeatures++;
            }
        }
        if(validfeatures>0){
            ds[f.name]=d;
        }
    }
    this.featureSet = obj;
    this.devices = ds;
    console.log("gotHierarchy");
}.bind(this);
Client.prototype.getDevicesInGroups = function(groups){
    for(var i=0;i<groups.length;i++){
        this.getDevicesInGroup(groups[i]);
    }
}.bind(this);
Client.prototype.getDevicesInGroup = function(group,cb){
    var msg = {"version":1,"senderId":this.senderId,"class":"group","direction":"request","operation":"read","transactionId":1,"items":[{"itemId":"cjpekflrs002y3b64i4f80xf1","payload":{"groupId":group,"features":1,"subgroups":true,"subgroupDepth":10,"blocks":true,"scripts":true,"devices":1}}]}
    this.Send(msg,this.recievedDeviceInfo);
}.bind(this);

Client.prototype.recievedDeviceInfo = function (msg) {
    var f = {};
    var features = msg.items[0].payload.features;
    
    for (var property in features) {
        if (features.hasOwnProperty(property)) {
            var feature = features[property];
           

            var type = feature.attributes.type;
            if(type=="switch"||type=="dimLevel"){
                f[feature.featureId] = {"featureId":feature.featureId,"type":type};
            }
        }
    }
    this.features = f;
    this.getHierarchy(this.rootGroupIds[0],this.gotHierarchy);
}.bind(this);
Client.prototype.listDevices = function () {
    return this.devices;
}.bind(this);
Client.prototype.Send = function (obj,cb) {
    var client = this;
    this.ensureConnected(function(){
        client.send(obj,cb);
    });
}.bind(this);

Client.prototype.ensureConnected = function (cb) {
    if(this.ws.readyState === WebSocket.OPEN){
        cb();
    }else{
        this.connect(function(){
            cb();
        });
    }
}.bind(this);

}
exports.Client = Client;