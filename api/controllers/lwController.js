'use strict';

module.exports = function (lwClient) {
    var module = {};
    lwClient.connect(function(){});
    module.switch = function(req,res,on) {
        var device =req.params.device;
        if(lwClient.devices.hasOwnProperty(device) && lwClient.devices[device].hasOwnProperty("switch")){
        lwClient.switch(lwClient.devices[device].switch,on,function(){});
        return res.status(200).send({result:"ok"});
        }else{
            return res.status(404).send({result:"failed",message:"Unknown device"}); 
        }
    }

    module.list = function(req,res){
        var devices = lwClient.devices;
            return res.status(200).send({result:"ok",devices:devices});
    }
    return module;
}