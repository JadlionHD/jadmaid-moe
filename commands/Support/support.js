exports.run = function(client, msg, args) {

	msg.author.getDMChannel().then( (message) => {
		message.createMessage(`**Support Server**\nhttps://discord.gg/zCr2jeZ`)
	})
	msg.channel.createMessage(`${msg.author.mention} Please check your direct message`).then((message) => {
	    setTimeout(() => {
	        message.delete();

	    }, 7 * 1000)
	})
}

exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Support help!",
    usage: `j!support (no argument)`,
    example: `j!support`,
	aliases: ["helpme"]
}

