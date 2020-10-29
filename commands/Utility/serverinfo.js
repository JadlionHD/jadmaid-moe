exports.run = function (client, msg, args) {

	let guild = msg.channel.guild;
	let botCount = guild.members.filter(member => member.user.bot).length;
	let owner = guild.members.get(guild.ownerID).user;
    let user = msg.author;
    let verifyLevel = ["NONE", "LOW", "MEDIUM", "HIGH", "VERY HIGH"];

    let BannerURL = guild.dynamicBannerURL("png", 4096) || "";
    let msgEmbed = {
    	embed: {
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
• CreatedAt: ${client.util.timeStamp(guild.createdAt)}
• Verification Level: ${verifyLevel[guild.verificationLevel]}
\`\`\`
\`\`\`yaml
• Vanity Url: ${guild.vanityURL || ""}
• Boosts: ${guild.premiumSubscriptionCount} (Level ${guild.premiumTier})
• Features: ${guild.features.map(fitur => `${fitur[0] + fitur.toLowerCase().slice(1)}`).join(", ").replace(/_/g, ' ')}
\`\`\`
`,
        footer: {
        	text: `Replying to ${user.username}#${user.discriminator}`,
        	icon_url: `${user.avatarURL}`
        },
        thumbnail: {
            url: guild.iconURL
        },
        image: {
        	url: BannerURL
        },
        fields: []
    }}
    let emojiArray = [];
    guild.emojis.map(e => {
    	if(e.animated === true) {
    		let resultEmoji = `<a:${e.name}:${e.id}> `;
    		emojiArray.push(resultEmoji)
    	} else {
    		let resultEmoji = `<:${e.name}:${e.id}> `;
    		emojiArray.push(resultEmoji)
    	}
    })
    let splitArray = client.util.splitter(emojiArray.join(" "));
    for(let i = 0; i < splitArray.length; i++) {
    	if(i > 2) break;
    	let j = 1;
    	j += i
    	let name = `❯ Emojis ${j}`;
    	let value = splitArray[i];

    	msgEmbed.embed.fields.push({name, value});
    }
    msg.channel.createMessage(msgEmbed);
};

exports.help = {
    cooldown: 5,
    ratelimit: 1,
    userPerms: [],
    clientPerms: [],
    description: "Showing a server information",
    usage: `j!serverinfo (no argument)`,
    example: `j!serverinfo`,
    aliases: []
}