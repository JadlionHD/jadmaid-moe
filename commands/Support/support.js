exports.run = function(client, msg, args) {

	msg.author.getDMChannel().then( (message) => {
		message.createMessage(`**Support Server**\nhttps://discord.gg/zCr2jeZ`)
	})
	msg.channel.createMessage("Please check your direct message");
}

exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: [],
	aliases: ["helpme"]
}

