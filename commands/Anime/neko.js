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
						url: `${body.neko}`
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
		let nekourl1 = "https://www.nekos.life/api/neko";
		requesting(nekourl1, "GET", true)
	}

	if(msgNeko === "nsfw") {
		if (msg.channel.nsfw === true) {
			let nekourl2 = "https://www.nekos.life/api/lewd/neko";
			requesting(nekourl2, "GET", true)
		} else {
			msg.channel.createMessage("This command require `NSFW` Permission")
		}
	}

}

exports.aliases = [];