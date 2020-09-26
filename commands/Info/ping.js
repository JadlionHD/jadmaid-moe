exports.run = function (client, msg, args) {
	let user = msg.author;
	let wsPING = msg.timestamp - new Date().getTime();
    let ShardPING = client.shards.get(0).latency;

    msg.channel.createMessage({embed: {
        color: client.config.colors.success,
        description: `
\`\`\`yaml
• Bot Ping: ${ShardPING}ms
\`\`\`
`,
        footer: {
        	text: `Replying to ${user.username}#${user.discriminator}`,
        	icon_url: `${user.avatarURL}`
        }
    }});
};

exports.aliases = [];