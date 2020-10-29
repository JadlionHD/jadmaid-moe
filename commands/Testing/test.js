const anilist = require("../../structures/anilistAPI.js");

exports.run = async function(client, msg, args) {
	anilist.searchAnime("konosuba").then((p) => {
		// returning success json body
		console.log(p)
	}).catch((e) => {
		// returning error json body
		console.log(e)
	})
	//msg.channel.createMessage("Lol")
}

exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Testing purposes",
    usage: `j!test (no argument)`,
    example: `j!test`,
	aliases: []
}

