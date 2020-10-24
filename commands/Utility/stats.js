const { VERSION } = require('eris');

exports.run = async function (client, msg, args) {
  
    let wsPING = client.shards.get(0).latency;
  
    let findOwner = client.config.ownerID[0]; //to get your owner name put your ID at index 0 in config
  
    let getOwner = client.users.get(findOwner);

    let owner = `${getOwner.username}#${getOwner.discriminator}`;
    let user = msg.author;
  
    msg.channel.createMessage({embed: {
		color: client.config.colors.success,
		thumbnail: { 
			url: client.user.avatarURL 
		 },
		description: `
**Bot Info:**
\`\`\`yaml
• Bot Name: ${client.user.username}
• Created By: ${owner}
• Ping: ${wsPING+'ms'}
\`\`\`
**Presence:**
\`\`\`yaml
• Total Shards: ${client.shards.size}
• Total Users: ${client.util.numberComa(client.users.size)}
• Total Guilds: ${client.guilds.size}
• Total Channels: ${Object.keys(client.channelGuildMap).length + Object.keys(client.privateChannelMap).length}
\`\`\`
**System Info:**
\`\`\`yaml
• Uptime: ${client.util.secondParser(process.uptime())}
• Library Used: Eris (v${VERSION})
• Node Version: ${process.version}
• RAM Usage: ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)+'MB'}
\`\`\`
`,
        footer: {
            text: `Replying to ${user.username}#${user.discriminator}`,
            icon_url: `${user.avatarURL}`
        }
    }});
};


exports.help = {
    cooldown: 5,
    ratelimit: 1,
    userPerms: [],
    clientPerms: [],
    description: "Showing bot information",
    usage: `j!stats (no argument)`,
    example: `j!stats`,
    aliases: ["botinfo"]
}

