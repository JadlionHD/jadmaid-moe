const request = require("request");

exports.run = function (client, msg, args) {
	let user = msg.author;
	let target = msg.mentions[0];
	if(!target) target = msg.author;
	request({
		url: `https://nekos.life/api/v2/img/feed`,
		method: "GET",
		json: true
	}, function (err, res, body) {
		let msgEmbed = {
			embed: {
				color: client.config.colors.success,
				description: `🍚 ${user.mention} feeding ${target.mention}`,
				image: {
					url: `${body.url}`
				},
		        footer: {
		        	text: `Replying to ${user.username}#${user.discriminator}`,
		        	icon_url: `${user.avatarURL}`
		        }
			}
		}

		msg.channel.createMessage(msgEmbed);
	})
}

exports.help = {
	cooldown: 5,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Random gif of feed",
    usage: `j!feed (no argument)`,
    example: `j!feed`,
	aliases: []
}