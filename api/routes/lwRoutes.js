'use strict';
module.exports = function (app,lwClient) {
	// #region On/off
    const  lw = require('../controllers/lwController')(lwClient);
    console.log("loaded lw Routes");
	app.get('/api/lights/:device/on',(req,res) => {
		try {
			lw.switch(req,res,1);
		} catch (e) {
			return res.status(500).send({result:e.message});
		}
		});
		
    app.get('/api/lights/:device/off',(req,res) => {
		try {
			lw.switch(req,res,0);
		} catch (e) {
			return res.status(500).send({result:e.message});
		}
		});
		app.get('/api/lights',(req,res) => {
			try {
				lw.list(req,res);
			} catch (e) {
				return res.status(500).send({result:e.message});
			}
			});
}
	// #endregion