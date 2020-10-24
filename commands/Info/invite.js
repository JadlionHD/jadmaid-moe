exports.run = function(client, msg, args) {
	let user = msg.author;
	let msgEmbed = {
		embed: {
			color: client.config.colors.success,
			description: `
**• top.gg link**
https://top.gg/bot/704669618719162449
**• vote link**
https://top.gg/bot/704669618719162449/vote
`
		}
	}
	msg.channel.createMessage(msgEmbed);
}

exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Showing invite link of jadmaid bot",
    usage: `j!invite (no argument)`,
    example: `j!invite`,
	aliases: []
}