require("dotenv").config();
const request = require("request");

module.exports = async client => {

    console.log(`[UPTIME] [${client.util.getCurrentTime()}] ${client.user.username} is ready now!`);

	client.editStatus({name: `Stile | j!help`, type: 5, url: "http://jadmaid.xyz"});

};

