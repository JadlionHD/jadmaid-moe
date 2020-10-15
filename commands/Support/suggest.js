exports.run = function(client, msg, args) {
	let req = args.join(" ");

	if(!req) return msg.channel.createMessage("argument: <enter some suggestion>");
	msg.channel.createMessage(`Thank you for your suggestion! <a:nekoblush:708698768882663496>`);

	let msgEmbed = {
		embed : {
			color: client.config.colors.success,
			title: `${msg.author.username}#${msg.author.discriminator} ID: ${msg.author.id}`,
			description: `**Suggesting:** ${req}`
		}
	}

	client.createMessage("708696129843494944", msgEmbed)
}

exports.help = {
	cooldown: 3600,
	ratelimit: 3,
	aliases: ["suggestion"]
}
