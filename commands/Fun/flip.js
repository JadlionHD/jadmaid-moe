const sharp = require("sharp")
const fs = require("fs");
const axios = require("axios");

exports.run = function(client, msg, args) {
	let user = msg.mentions[0] || client.users.get(args[0]) || msg.author;
	axios.get(user.dynamicAvatarURL("", 1024), {
		responseType: "arraybuffer"
	}).then(buffer => {
		sharp(buffer.data)
			.flip(true)
			.toBuffer((err, data, info) => msg.channel.createMessage("Woah", {file: data, name: "flip.jpg"}))
	})
}

exports.help = {
	cooldown: 5,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Flip some image lol",
    usage: `j!flip [mention/user id]`,
    example: `j!flip @JadlionHD`,
	aliases: []
}