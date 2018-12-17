'use strict';
var wol = require('wake_on_lan');
var config = require('../../config/config.json');
var Client = require('./tvClient').Client;
var SkyRemote = require('sky-remote');


function openBrowserOnTV(ip, url, cb) {
    var client = new Client();

    client.connect(ip, function (err) {
        if (err) {
            console.log("error connecting");
            cb(err);
            return;
        } else {
            console.log("connected");
        }

        client.sendRequest('ssap://system.launcher/open', {"target": url}, cb);
    });
}
function turnPowerOff(ip, cb) {
    var client = new Client();

    client.connect(ip, function (err) {
        if (err) {
            console.log("error connecting");
            cb(err);
            return;
        } else {
            console.log("connected");
        }

            client.sendRequest('ssap://system/turnOff', {}, cb);
    });
}

function toggleMuteOnTV(ip, cb) {
	console.log("toggleMuteOnTV");
    var client = new Client();
	var ip = config.tv.ip;
    client.connect(ip, function (err) {
        if (err) {
            console.log("error connecting");
            cb(err);
            return;
        } else {
            console.log("connected");
        }
        client.sendRequest('ssap://audio/getMute', {}, function (response) {
            client.sendRequest('ssap://audio/setMute', {"mute": !response.mute}, cb);
        });
    });
}



exports.audio = function(req,res) {
    var client = new Client();
    var ip = config.tv.ip;
    var action =req.params.action;
   var cb;
    if(action =="toggle"){
        cb = function (err){
            client.sendRequest('ssap://audio/getMute', {}, function (response) {
                client.sendRequest('ssap://audio/setMute', {"mute": !response.mute}, function(){});
            });
        }
    }else{
        cb = function (err){
            client.sendRequest('ssap://audio/setMute', {"mute": !action=="on"}, function(){});
        }
    }

    client.connect(ip, cb);
}




  exports.powerOff = function(req, res) {
	var ip = config.tv.ip;
	turnPowerOff(ip, function done (err) {
            if (err) {
                console.log("toogle must failed: " + JSON.stringify(err));
            } else {
                console.log("toggle mute successful");
            }
            
        });
    }

exports.powerOnXbox = function(req, res) {


//Wake on lan for the tv
    console.log("waking " +config.tv.mac);
	wol.wake(config.tv.mac,function(error){
        if(error){
            console.log(err);
        }else{
            console.log("Woken");
        }
    });
    //wake xbox
    wol.wake("28:18:78:8a:26:3f",function(error){
        if(error){
            console.log(err);
        }else{
            console.log("Woken");
        }
    });




    //change the tv input to sky
    var client = new Client();
    var ip = config.tv.ip;
    client.connect(ip, function (err) {
        if (err) {
            console.log("error connecting");
            cb(err);
            return;
        } else {
            console.log("woo")
            client.sendRequest('ssap://tv/switchInput', {"inputId":"HDMI_2"}, function(){});
        }
  });
            
        }

           
exports.powerOn = function(req, res) {


    //Wake on lan for the tv
        console.log("waking " +config.tv.mac);
        wol.wake(config.tv.mac,function(error){
            if(error){
                console.log(err);
            }else{
                console.log("Woken");
            }
        });
    
        var remoteControl = new SkyRemote('192.168.1.93');
        remoteControl.press("power");
    
        //change the tv input to sky
        var client = new Client();
        var ip = config.tv.ip;
        client.connect(ip, function (err) {
            if (err) {
                console.log("error connecting");
                cb(err);
                return;
            } else {
                console.log("woo")
                client.sendRequest('ssap://tv/switchInput', {"inputId":"HDMI_1"}, function(){});
            }
      });
                
            }


        exports.channel = function(req,res) {
            var remoteControl = new SkyRemote('192.168.1.93');
            var channel = req.params.channel;
            // Simple - just send a command
            var buttons = [];
            console.log(channel.length);
            for(var i=0; i<channel.length;i++){
                console.log(i+"=="+channel.charAt(i));
                buttons.push(channel.charAt(i));
            }
            remoteControl.press(buttons);
            
            }

        exports.toast = function(req,res) {
            var message = req.body.message
            
                //change the tv input to sky
                var client = new Client();
                var ip = config.tv.ip;
                client.connect(ip, function (err) {
                    if (err) {
                        console.log("error connecting");
                        cb(err);
                        return;
                    } else {
                        console.log("woo")
                        client.sendRequest('ssap://system.notifications/createToast', {"message":message}, function(){});
                    }
              });
                        
                    }


