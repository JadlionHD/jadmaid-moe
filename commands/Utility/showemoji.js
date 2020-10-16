const baseURL = "https://cdn.discordapp.com/emojis/";

exports.run = async function (client, msg, args) {
	let msgs = await msg.channel.getMessages(10)
	if(!msgs) {
		msg.channel.createMessage("There is no emojis! I can see only 10 previous messages")
	}
	let emojis = "";
	for(let i in msgs) {
		emojis += msgs[i].content;
	}

	emojis = parseIDs(emojis);

	if(!emojis) {
		msg.channel.createMessage("There is no emojis! I can see only 10 previous messages")
	}


	if(emojis.length === 0) msg.channel.createMessage("There is no emojis! I can see only 10 previous messages");
	else msg.channel.createMessage(createEmbed(emojis[0].name, emojis[0].id, emojis[0].url))


	function createEmbed(name, id, url) {
		let msgEmbed = {
			embed: {
				color: client.config.colors.success,
				description: `\`${name}\` \`${id}\``,
				image: {
					url: `${url}`
				}
			}
		}
		return msgEmbed;
	}

	function parseIDs(text) {
		let emojis = [];

		let parsedEmojis = text.match(/<a?:[a-z0-9_]+:[0-9]+>/gi);

		for(let i in parsedEmojis){
			let emoji = parsedEmojis[i];
			let name = emoji.match(/:[a-z0-9_]+:/gi)[0].substr(1).slice(0,-1);
			let id = emoji.match(/:[0-9]+>/gi)[0].substr(1).slice(0,-1);
			let gif = (emoji.match(/<a:/gi)?true:false);
			let url = baseURL+id+(gif?".gif":".png");
			emojis.push({name,id,gif,url});
		}

		return emojis;
	}
}

exports.help = {
	cooldown: 5,
	ratelimit: 1,
	userPerms: [],
	aliases: []
}