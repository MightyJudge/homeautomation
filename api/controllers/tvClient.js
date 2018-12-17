'use strict'
var events = require('events');
var WebSocket = require('ws');
var util = require('util');

var Client = function () {
    events.EventEmitter.call(this);

    this.requestId = 1;
    this.requests = {};
    this.manifest = {
        permissions: ["LAUNCH", "CONTROL_AUDIO","CONTROL_POWER","WRITE_NOTIFICATION_TOAST","READ_INPUT_DEVICE_LIST"]
    };
};

events.EventEmitter.call(Client);
util.inherits(Client, events.EventEmitter);

Client.prototype.connect = function (ip, cb) {
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

    this.ws = new WebSocket("ws://" + ip + ":3000", {origin: "null"});

	
    this.ws.on('open', function () {
        console.log("opened");
        this.send({
            type: 'register',
            payload: {
                manifest: this.manifest,
				"client-key":"45d9caf4ad2c3424fa3b84748b73ab12"
            }
        });
    }.bind(this));
	

    this.ws.on('message', function (data) {
        console.log("Received message: " + data);

        var message = JSON.parse(data);

        var request = message.id ? this.requests[message.id] : null;

        if (message.type === "response" || message.type === "error") {
            if (request) {
                if (request.callback) {
                    request.callback(message.payload);
                }

                if (!request.isSubscription) {
                    delete this.requests[request];
                }
            }
        } else if (message.type === "registered") {
            this.emit('connected');
        }
    }.bind(this));

    this.ws.on('error', function (err) {
        this.emit('error', err);
    }.bind(this));

    this.ws.on('close', function () {
        this.emit('close', 'connection closed');
    }.bind(this));
};

Client.prototype.send = function (obj) {
    console.log("Sending: " + JSON.stringify(obj));
	try{
		this.ws.send(JSON.stringify(obj));
	}catch(e){
	
	}
};



Client.prototype.sendRequest = function (uri, payload, cb) {
    var requestId = this.requestId++;

    this.send({
        type: 'request',
        id: requestId,
        uri: uri,
        payload: payload || {}
    });

    this.requests[requestId] = {callback: cb};
};
exports.Client = Client;