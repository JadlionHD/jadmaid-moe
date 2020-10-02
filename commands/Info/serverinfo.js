exports.run = function (client, msg, args) {

	let guild = msg.channel.guild;
	let botCount = guild.members.filter(member => member.user.bot).length;
	let owner = guild.members.get(guild.ownerID).user;
    let user = msg.author;
    let verifyLevel = ["NONE", "LOW", "MEDIUM", "HIGH", "VERY HIGH"]
  
    msg.channel.createMessage({embed: {
        color: client.config.colors.success,
        description: `
\`\`\`yaml
• Name: ${guild.name}
• Owner: ${owner.username}#${owner.discriminator}
• Channels: ${guild.channels.size}
• Members: ${guild.memberCount}
• Users: ${guild.memberCount - botCount}
• Bots: ${botCount}
• Roles: ${guild.roles.size}
• Emojis: ${guild.emojis.length}
• Region: ${guild.region}
• Boosts: ${guild.premiumSubscriptionCount} (Level ${guild.premiumTier})
• CreatedAt: ${client.util.timeStamp(guild.createdAt)}
• Verification Level: ${verifyLevel[guild.verificationLevel]}
• Features: ${guild.features.map(fitur => `${fitur[0] + fitur.toLowerCase().slice(1)}`).join(", ").replace(/_/g, ' ')}
\`\`\`
`,
        footer: {
        	text: `Replying to ${user.username}#${user.discriminator}`,
        	icon_url: `${user.avatarURL}`
        },
        thumbnail: {
            url: guild.iconURL
        }
    }});
};

exports.aliases = [];
