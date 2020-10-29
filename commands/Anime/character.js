const request = require("request");
const anilist = require("../../structures/anilistAPI.js");

exports.run = function (client , msg, args) {
	let req = args.join(" ");
    let userReply = msg.author;

	//if(client.util.isAlphaNumeric(req) === false) return msg.channel.createMessage("<:cross:762537848691752960> Please enter a valid alphanumeric");
	if(!req) return msg.channel.createMessage("<:cross:762537848691752960> Please enter specific name of the character anime!");

	anilist.searchCharacter(req).then((body) => {
		let splitArray;
		if(body.data.Character.description.includes("<br>")) {
			let splitResult = client.util.splitter(body.data.Character.description.replace(/<br>/g, "") ? body.data.Character.description.replace(/<br>/g, ""): "undefined", 1024);
			splitArray = splitResult;
		} else {
			let splitResult = client.util.splitter(body.data.Character.description ? body.data.Character.description: "undefined", 1024);
			splitArray = splitResult;
		}
		let msgEmbed = {
			embed: {
				title: `${body.data.Character.name.full}`,
				url: body.data.Character.siteUrl,
				color: client.config.colors.success,
				fields: [
				],
				thumbnail: {
					url: body.data.Character.image.large
				},
		        footer: {
		        	text: `Powered by AniList`,
		        	icon_url: `https://anilist.co/img/icons/android-chrome-512x512.png`
		        },
			}
		}
		for(let i = 0; i < splitArray.length; i++) {
			if(i > 4) break;
			let j = 1;
			j += i;
			let name = `❯ Description Part ${j}`;
			let value = splitArray[i];
			msgEmbed.embed.fields.push({name, value})
		}

		msg.channel.createMessage(msgEmbed)		
	}).catch(e => {
		msg.channel.createMessage("<:cross:762537848691752960> No Result Found")
	})
}

exports.help = {
	cooldown: 10,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Search some anime/manga characters",
    usage: `j!character <character name>`,
    example: `j!character kirigaya kazuto`,
	aliases: ["chara"]
}