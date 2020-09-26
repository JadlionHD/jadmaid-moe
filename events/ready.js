require("dotenv").config();
const request = require("request");
const DBL = require("dblapi.js");

module.exports = async client => {
	const dbl = new DBL(process.env.DBL_TOKEN, client);

	console.log(`[SYSTEM] [${client.util.getCurrentTime()}] Posted Server Count`)
	dbl.postStats(client.guilds.size);

    console.log(`[UPTIME] [${client.util.getCurrentTime()}] ${client.user.username} is ready now!`);

	client.editStatus({name: `jadmaid.xyz | j!help`, type: 0, url: "http://jadmaid.xyz"});

};

