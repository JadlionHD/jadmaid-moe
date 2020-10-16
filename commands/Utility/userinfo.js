exports.run = function (client, msg, args) {
    
		let user = msg.mentions[0] || client.users.get(args[0]) ||msg.author;
		let member = msg.channel.guild.members.get(user.id);
        let userReply = msg.author;
        
    msg.channel.createMessage({embed: {
        color: client.config.colors.success,
        description: `
**User Info:**
\`\`\`yaml
• Full Name: ${user.username}#${user.discriminator}
• ID: ${user.id}
• Nickname: ${member.nick}
• Roles: ${member.roles.length}
• Joined Guild At: ${client.util.timeStamp(member.joinedAt)}
• Created Discord At: ${client.util.timeStamp(user.createdAt)}
\`\`\`
**Rich Presence:**
\`\`\`yaml
• Status: ${member ? member.status : "None"}
• Rich Presence: ${member.game ? member.game.name : "None"}
• State Presence: ${member.game ? member.game.state : "None"}
• Details Presence: ${member.game ? member.game.details : "None"}
\`\`\`
`,
        footer: {
        	text: `Replying to ${userReply.username}#${userReply.discriminator}`,
        	icon_url: `${userReply.avatarURL}`
        },
        thumbnail: {
            url: user.dynamicAvatarURL("", 1024)
        }
    }});
};


exports.help = {
    cooldown: 5,
    ratelimit: 1,
    userPerms: [],
    aliases: []
}
