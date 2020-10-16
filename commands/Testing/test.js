exports.run = function(client, msg, args) {

	msg.channel.createMessage("Work");
}

exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: [],
	aliases: []
}

