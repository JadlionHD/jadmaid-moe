//const db = require("quick.db");

exports.run = async(client, msg, args) => {
	// if(!args[0]) return msg.channel.createMessage("Provide some arguments to change the prefix");
	// if(args[1]) return msg.chanenl.createMessage("Double prefix are not allowed");
	// if(args[0].length > 5) return msg.channel.createMessage("You can set a prefix less than 5 characters");
	// if(args[0] === client.config.PREFIX) {
	// 	db.delete(`prefix_${msg.channel.guild.id}`)
	// }

	// db.set(`prefix_${msg.channel.guild.id}`, args[0]);
	// msg.channel.createMessage(`Prefix has been set to **${args[0]}**`);

	msg.channel.createMessage(`This command has been disabled for a while`)
}

exports.help = {
	cooldown: 30,
	ratelimit: 1,
	userPerms: ["administrator"],
	clientPerms: [],
	description: "Change a guild prefixes",
	usage: "j!setprefix [new prefix]",
	example: "j!setprefix !!",
	aliases: []
}