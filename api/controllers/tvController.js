'use strict';
var wol = require('wake_on_lan');
var config = require('../../config/config.json');
var Client = require('./tvClient').Client;
var SkyRemote = require('sky-remote');
const SkyQ = require('sky-q');

const ip_address = '192.168.0.21';
//Living Room 192.168.0.21
//bedroom 192.168.0.25
const box = new SkyQ({ip:ip_address})

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
                console.log("toogle power failed: " + JSON.stringify(err));
            } else {
                console.log("toggle power successful");
            }
            
        });

        box.getPowerState().then(isOn=>{
        if (isOn) {
            console.log("The sky box is on, let's turn it off")
            var remoteControl = new SkyRemote(ip_address);
            remoteControl.press("power");
        } else {
            console.log("The sky box is already off")
        }
        }).catch(err=>{
        console.error("Unable to determine power state")
        console.error("Perhaps looking at this error will help you figure out why", err)
        })

        
        //ensure the sky box is on by pressing the sky button, then turn if off by pressing the power button
        //if we just pressed the power button if would turn it on if it was already off
        
        
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
    
        var remoteControl = new SkyRemote(ip_address);
        remoteControl.press("sky");
    
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
            var remoteControl = new SkyRemote(ip_address);
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


