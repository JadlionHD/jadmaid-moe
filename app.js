/*
* Copyright JadlionHD 2020
* JadmMaid Bot
* Made with Javascript & NodeJS
* And Library Eris
*/

require("dotenv").config();
const cron = require("cron");
const ErisClient = require('./structures/Client.js');
const client = new ErisClient(require('./config.js'), {
	maxShards: 'auto',
	messageLimit: 0,
	getAllUsers: false,
	allowedMentions: {
		everyone: false,
		roles: true,
		users: true
	},
	disableEvents: {
		TYPING_START: true,
		VOICE_STATE_UPDATE: true,
	}
});
const request = require("request");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBL_TOKEN, {
	statsInterval: 1800000
}, client)

setTimeout(() => {
	dbl.postStats(client.guilds.size);
	console.log(`[SYSTEM] [${client.util.getCurrentTime()}] Posted Server Count`);
}, 15 * 1000)

require("./test/hrgram.js")(client);



client.connect();