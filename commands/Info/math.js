const mathjs = require("mathjs");

exports.run = function(client, msg, args) {

	if(!args.join(" "))
		return msg.channel.createMessage("Please enter a valid number that you want to calculate");
	
	try {
		let msgEmbed = {
			embed: {
				color: client.config.colors.success,
				description: `
**Math Question:**
\`\`\`yaml
${args.join(" ")}
\`\`\`
**Math Answer:**
\`\`\`yaml
${mathjs.evaluate(args.join(" "))}
\`\`\`
`
			}
		}

		msg.channel.createMessage(msgEmbed)
	} catch(e) {
		return msg.channel.createMessage("Please enter a valid number that you want to calculate");
	}
}

exports.aliases = [];