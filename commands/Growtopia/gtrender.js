const request = require("request");

exports.run = function (client, msg, args) {
	let user = msg.author;
	let req = args.join(" ");
	let notRendered = "<:cross:762537848691752960> The world of you has been request is not rendered yet, please render it first!";
	if(client.util.isAlphaNumeric(req) === false) return msg.channel.createMessage("<:cross:762537848691752960> Please enter a valid alphanumeric");
	if(!req) return msg.channel.createMessage("Please enter specific world");

	request({
		url: `https://s3.amazonaws.com/world.growtopiagame.com/${req}.png`,
		method: "GET"
	}, function(err, res, body) {
		let msgEmbed = {
			embed: {
				color: client.config.colors.success,
				title: `${req} render world`,
				image: {
					url: `https://s3.amazonaws.com/world.growtopiagame.com/${req}.png`
				},
				footer: {
					text: `Replying to ${user.username}#${user.discriminator}`,
					icon_url: `${user.avatarURL}`
				}
			}
		}
		if(res.statusCode === 404 || res.statusCode === 403)
			msg.channel.createMessage(notRendered);
		if(res.statusCode === 200)
			msg.channel.createMessage(msgEmbed);
	})
}

exports.help = {
	cooldown: 5,
	ratelimit: 1,
	aliases: []
}