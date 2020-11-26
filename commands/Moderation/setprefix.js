exports.run = async function(client, msg, args) {
	// if(!args[0]) return msg.channel.createMessage("What prefix you want to change? provide it");
	// if(args[0].length > 4) return msg.channel.createMessage("Only 5 or less to setup a prefix");
	// if(args[1]) return msg.channel.createMessage("No double argument");
	// if(args[0] === client.config.PREFIX) {
	// 	client.database.delete(`prefix_${msg.channel.guild.id}`);
	// 	msg.channel.createMessage(`Done! prefix now changed back to default`)
	// } else {
	// 	client.database.set(`prefix_${msg.channel.guild.id}`, args[0]);
	// 	msg.channel.createMessage(`Done! prefix now changed into \`${args[0]}\``)
	// }
	msg.channel.createMessage(`Disabled for a while`)
}

exports.help = {
	cooldown: 60,
	ratelimit: 1,
	userPerms: ["administrator"],
	clientPerms: [],
    description: "Change a guild prefixes",
    usage: `j!setprefix [new prefix]`,
    example: `j!setprefix`,
	aliases: []
}