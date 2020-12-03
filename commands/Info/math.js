const mathjs = require("mathjs");

exports.run = function(client, msg, args) {

	if(!args.join(" ") || args.join(" ").includes(":") || args.join(" ").includes("config"))
		return msg.channel.createMessage("<:cross:762537848691752960> Please enter a valid number that you want to calculate");
	
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
		return msg.channel.createMessage("<:cross:762537848691752960> Please enter a valid number that you want to calculate");
	}
}

exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "A Calculator",
    usage: `j!math [Number that you want to calculate]`,
    example: `j!math 9+10`,
	aliases: []
}