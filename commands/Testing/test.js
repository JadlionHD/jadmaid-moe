const Eris = require("eris");

exports.run = async function(client, msg, args) {
	console.log(client.database.set("halo", {gay: "no im not wait no"}))
}
exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: ["administrator"],
	clientPerms: [],
    description: "Testing purposes",
    usage: `j!test (no argument)`,
    example: `j!test`,
	aliases: []
}

