exports.run = function(client, msg, args) {
	client.getMessages("728957611923210241").then((messages) => {
		let user = msg.author;
		let msgEmbed = {
			embed: {

			}
		}
	    msgEmbed.embed = messages[0].embeds[0]
	    delete msgEmbed.embed.type;
	    msg.channel.createMessage(msgEmbed)
	})
}

exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Latest news about growtopia",
    usage: `j!gtnews (no argument)`,
    example: `j!gtnews`,
	aliases: []
}