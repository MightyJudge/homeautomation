'use strict';
module.exports = function (app) {
	
	// #region Audio
	var tv = require('../controllers/tvController');
	app.get('/tv/audio/:action',(req,res) => {
		try {
			tv.audio(req,res);
			return res.status(200).send({result:"ok"});
		} catch (e) {
			return res.status(500).send({result:"failed"});
		}
	});
	// #endregion

	// #region Power
	app.get('/tv/power/off',(req,res) => {
		try {
			console.log("power off");
			tv.powerOff();
			return res.status(200).send({result:"ok"});
		} catch (e) {
			return res.status(500).send({result:"failed"});
		}
	});
	app.get('/a',(req,res) => {
		try {
			console.log("power off");
			tv.powerOff();
			return res.status(200).send({result:"ok"});
		} catch (e) {
			return res.status(500).send({result:"failed"});
		}
	});
	
		app.get('/tv/power/on',(req,res) => {
		try {
			console.log("power on");
			tv.powerOn();
			return res.status(200).send({result:"ok"});
		} catch (e) {
			return res.status(500).send({result:"failed"});
		}
	});
	app.get('/xbox/power/on',(req,res) => {
		try {
			console.log("power on");
			tv.powerOnXbox();
			return res.status(200).send({result:"ok"});
		} catch (e) {
			return res.status(500).send({result:"failed"});
		}
	});
	// #endregion
	
	app.post('/tv/message',(req,res) => {
		try {
			tv.toast(req,res);
			return res.status(200).send({result:"ok"});
		} catch (e) {
			return res.status(500).send({result:"failed"});
		}
	});

	app.get('/tv/channel/:channel',(req,res) => {
		console.log("Change channel");
		try {
			tv.channel(req,res);
			return res.status(200).send({result:"ok"});
		} catch (e) {
			return res.status(500).send({result:"failed"});
		}
	});
	
	
};