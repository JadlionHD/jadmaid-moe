module.exports = async (client, guild) => {
	let owner = guild.members.get(guild.ownerID).user;
	let botCount = guild.members.filter(member => member.user.bot).length;
	let msgEmbed = {
		embed: {
			description: `
**System Invite Leave/Kicked**
\`\`\`yaml
• Name: ${guild.name}
• Owner: ${owner.username}#${owner.discriminator}
• Owner ID: ${guild.ownerID}
• Channels: ${guild.channels.size}
• Users: ${guild.memberCount - botCount}
• Bots: ${botCount}
• Members: ${guild.memberCount}
• Boosts: ${guild.premiumSubscriptionCount} (Level ${guild.premiumTier})
\`\`\`
`,
			color: client.config.colors.error,
			footer: {
				text: `Total guilds: ${client.guilds.size}`
			}
		}
	}
	client.createMessage("762978567356940288", msgEmbed)
}