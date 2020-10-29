exports.run = function(client, msg, args) {
	let user = msg.author;
	let msgEmbed = {
		embed: {
			color: client.config.colors.success,
			fields: [
				{
					name: `[Shard ID]`,
					value: `${client.shards.map(e => `${e.id}\n`)}`,
					inline: true
				},
				{
					name: `[Ping]`,
					value: `${client.shards.map(e => `${e.latency}\n`)}`,
					inline: true
				},
				{
					name: `[Status]`,
					value: `${client.shards.map(e => `${e.status}\n`)}`,
					inline: true
				}
			]
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