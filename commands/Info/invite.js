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

exports.aliases = [];