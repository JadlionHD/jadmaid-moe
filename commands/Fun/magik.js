const request = require("request");

exports.run = function (client, msg, args) {
	let say = args[0];
	let user = msg.mentions[0] || msg.author || client.users.get(say);
	let targetAv = msg.attachments[0] ? msg.attachments[0].url : user.dynamicAvatarURL("png", 1204);
	msg.channel.createMessage("Generating...")

	request({
		url: `https://nekobot.xyz/api/imagegen?type=magik&image=${targetAv}&intensity=3`,
		method: "GET",
		json: true
	}, function(err, res, body) {
		//let currentImg = Buffer.isBuffer(body.message);
		//console.log(Buffer.from(body.message))
		//msg.channel.createMessage("Here we go", { file: currentImg, name: "magik" })
		msg.channel.createMessage(body.message)
	})
}

exports.aliases = [];