const achieve = require('../../achievements.json');

exports.run = function (client, msg, args) {
	let req = args.join(" ");
	let user = msg.author;
	if(!req) return msg.channel.createMessage("Please enter specific achievements that you want to see.");
	if (achieve[req.toLowerCase()]) {
		let msgEmbed = {
			embed: {
				color: client.config.colors.success,
				description: `
**${achieve[req.toLowerCase()].name}**
\`\`\`
${achieve[req.toLowerCase()].desc}
\`\`\`
`,
				footer: {
		        	text: `Replying to ${user.username}#${user.discriminator}`,
		        	icon_url: `${user.avatarURL}`
				},
				thumbnail: {
					url: achieve[req.toLowerCase()].icon
				}
			}
		}
		msg.channel.createMessage(msgEmbed)
	} else {
		msg.channel.createMessage("No such achievement found. Please make sure, that you're typing in the exact name of achievement.");
	}

}

exports.aliases = [];