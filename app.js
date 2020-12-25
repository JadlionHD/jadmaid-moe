/*
* Copyright JadlionHD 2020
* JadmMaid Bot
* Made with Javascript & NodeJS
* And Library Eris
*/

require("dotenv").config();
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
const topgg = require("@top-gg/sdk");
const dbl = new topgg.Api(process.env.DBL_TOKEN);

setTimeout(() => {
	dbl.postStats({
		serverCount: client.guilds.size,		
	})
	console.log(`[SYSTEM] [${client.util.getCurrentTime()}] Posted Server Count`);
}, 15 * 1000)

setInterval(() => {
	dbl.postStats({
		serverCount: client.guilds.size,		
	})
	console.log(`[SYSTEM] [${client.util.getCurrentTime()}] Posted Server Count`);
}, 1800000)

client.connect();