exports.run = function(client, msg, args) {
	let user = msg.author;
	let msgEmbed = {
		embed: {
			color: client.config.colors.success,
			description: `
\`\`\`yaml
[ID]  [Ping]  [Status]
${client.shards.map(e => `${e.id}`)}      ${client.shards.map(e => `${e.latency}`)}ms      ${client.shards.map(e => `${e.status}\n`)}
\`\`\`
`,
			footer: {
				text: `This guild on shard id: ${msg.channel.guild.shard.id}`
			}
		}
	}
	msg.channel.createMessage(msgEmbed)
}

exports.help = {
	cooldown: 20,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "View all shards status/information",
    usage: `j!shard`,
    example: `j!shard or j!shards`,
	aliases: ["shards"]
}