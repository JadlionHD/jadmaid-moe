exports.run = function(client, msg, args) {

	msg.channel.createMessage("Work");
}

exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: ["banMembers"],
	clientPerms: [],
    description: "Testing puporses",
    usage: `j!test (no argument)`,
    example: `j!test`,
	aliases: []
}

