const request = require("request");

exports.run = function (client, msg, args) {
	let say = args.join(" ");
	let user = msg.mentions[0] || client.users.get(say) || msg.author;
	let targetAv = msg.attachments[0] ? msg.attachments[0].url : user.dynamicAvatarURL("png", 4096);


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

exports.help = {
	cooldown: 30,
	ratelimit: 1,
	userPerms: [],
    description: "Generate mAgIK pIcTuRe",
    usage: `j!magik [userid/mention/attachments]`,
    example: `j!magik @JadlionHD\nj!magik (insert some attachment)`,
	aliases: []
}