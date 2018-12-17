'use strict';
module.exports = function (lwClient,server) {
const WebSocket = require('ws');
 
const wss = new WebSocket.Server({"server":server});
 

wss.on('connection', function connection(ws) {
    console.log("New WS Connection");
  ws.on('message', function incoming(message) {
      var msg = {};
      console.log("Got a message");
    try{
        msg = JSON.parse(message);
        console.log(msg);
        if(msg.type=="GetDevices"){
           GetDevices(ws,msg);
        }
        if(msg.type=="Switch"){
            SwitchDevice(ws,msg);
         }
    }catch(e){
       console.log(e);
    }

  });
 
  ws.send('{"type":"Connected"}');
});

function GetDevices(ws,msg){
    var obj = {type:"GetDevices",dir:"Response"};
    obj.id = msg.id ? msg.id:'';
    var devices = {};
    for (var property in lwClient.devices) {
        if (lwClient.devices.hasOwnProperty(property)) {
            var d = lwClient.devices[property];
            devices[property] = {name:property};
console.log(JSON.stringify(d));
            //switch
            if (d.hasOwnProperty("switch")) {
                console.log("switch");
                devices[property].switch = {"value":d.switch.value};
                
    
            }

        }
      }
    obj.payload = {
        "Our House":{
            name:"Our House",
            "devices":devices
        }
    }
    ws.send(JSON.stringify(obj));
}
function SwitchDevice(ws,msg){
    var feature = lwClient.devices[msg.device].switch.id;
    var on = msg.switch;
    lwClient.switch(feature,on,function(){
        
        var obj = {type:"Switch",dir:"Response","status":"done"};
        obj.id = msg.id ? msg.id:'';
    })
    
}
}