const request = require("request");

exports.run = function(client, msg, args) {
	let user = msg.author;
	function requesting(nekourl, metode, jsons) {
		request({
			url: nekourl,
			method: metode,
			json: jsons
		}, function (err, res, body) {
			let msgEmbed = {
				embed: {
					color: client.config.colors.success,
					image: {
						url: `${body.message}`
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

	let msgNeko = args[0];
	if(!msgNeko) return msg.channel.createMessage("argument: <sfw/nsfw>");

	if(msgNeko === "sfw") {
		let nekourl1 = "https://nekobot.xyz/api/image?type=neko";
		requesting(nekourl1, "GET", true)
	}

	if(msgNeko === "nsfw") {
		if (msg.channel.nsfw === true) {
			let nekourl2 = "https://nekobot.xyz/api/image?type=hneko";
			requesting(nekourl2, "GET", true)
		} else {
			msg.channel.createMessage("<:cross:762537848691752960> This command require `NSFW` Permission")
		}
	}

}

exports.help = {
	cooldown: 5,
	ratelimit: 1,
	userPerms: [],
	aliases: []
}