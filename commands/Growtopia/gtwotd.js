const request = require("request");

exports.run = function (client,msg, args) {
	let user = msg.author;
	request({
		url: "https://growtopiagame.com/detail",
		method: "GET",
		json: true
	}, function(err, res, body) {
		let msgEmbed = {
			embed: {
				color: client.config.colors.success,
				title: `Today's WOTD`,
				url: body.world_day_images.full_size,
				image: {
					url: body.world_day_images.full_size
				},
				footer: {
					text: `Replying to ${user.username}#${user.discriminator}`,
					icon_url: `${user.avatarURL}`
				}
			}
		}
		msg.channel.createMessage(msgEmbed)
	})
}

exports.help = {
	cooldown: 5,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Get growtopia daily world of the day!",
    usage: `j!gtwotd (no argument)`,
    example: `j!wotd`,
	aliases: []
}