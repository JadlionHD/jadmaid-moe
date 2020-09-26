const request = require("request");

exports.run = function (client, msg, args) {
	let user = msg.author;
	let target = msg.mentions[0];
	if(!target) target = msg.author;

	msg.channel.createMessage("It would be take 3-5 sec, please wait")
	request({
		url: `https://nekobot.xyz/api/imagegen?type=magik&image=${target.dynamicAvatarURL("png", 1024)}&intensity=3`,
		method: "GET",
		json: true
	}, function(err, res, body) {
		msg.channel.createMessage(body.message)
		//msg.channel.createMessage("test", {file: Buffer.from(`${body.message}`, "base64"), name: "magik"})
		//{file: Buffer.from(`${body.message}`), name: "magik"}
	})
}

exports.aliases = [];