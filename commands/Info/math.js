const mathjs = require("mathjs");

exports.run = function(client, msg, args) {
	let arg = args.join(" ");

	if(!arg || arg.includes(":") || arg.includes("config"))
		return msg.channel.createMessage("<:cross:762537848691752960> Please enter a valid number that you want to calculate");
	if(arg.length > 150)
		return msg.channel.createMessage("Woah woah woah, That's too much numbers");
	let result = mathjs.evaluate(arg).toString();
	if(result.includes("function"))
		result = `[Function: ${arg}] use ${arg}(arguments) instead.`;
	try {
		let msgEmbed = {
			embed: {
				color: client.config.colors.success,
				description: `
**Math Question:**
\`\`\`yaml
${arg}
\`\`\`
**Math Answer:**
\`\`\`yaml
${result}
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