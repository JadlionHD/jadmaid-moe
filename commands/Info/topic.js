const cheerio = require("cheerio");
const request = require("request");

exports.run = function(client, msg, args) {
	request({
		url: "https://www.conversationstarters.com/generator.php",
		method: "GET",
	}, function(err, res, body) {
		let $ = cheerio.load(body);
		let text = $("#random").text();

		text
			? msg.channel.createMessage(`**${text}**`)
			: msg.channel.createMessage('Oops, There is something wrong with the topic, please try again.');
	})
}

exports.help = {
	cooldown: 5,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Generate a random topic",
    usage: `j!topic (no argument)`,
    example: `j!topic`,
	aliases: []
}