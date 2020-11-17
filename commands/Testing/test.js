const Eris = require("eris");

exports.run = async function(client, msg, args) {
	//let message = await msg.channel.createMessage("Hello");
	//await message.addReaction("🛠️")
	//const reaction = await msg.awaitReactions({timeout: 10 * 1000, count: 1});

	const filter = (reaction, user) => {
		return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
	};
	msg.channel.createMessage("hello world").then((m) => {
		m.addReaction("👍")
		m.addReaction("👎")
	})
	msg.awaitReactions({timeout: 10 * 1000, count: 10, filter: filter}).then(m => {
		console.log(m)
	})

}

exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Testing purposes",
    usage: `j!test (no argument)`,
    example: `j!test`,
	aliases: []
}

