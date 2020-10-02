exports.run = function (client, msg, args) {
    
		let user = msg.mentions[0] || client.users.get(args[0]) ||msg.author;
		let member = msg.channel.guild.members.get(user.id);
        let userReply = msg.author;
        
    msg.channel.createMessage({embed: {
        color: client.config.colors.success,
        description: `
\`\`\`yaml
• Full Name: ${user.username}#${user.discriminator}
• ID: ${user.id}
• Nickname: ${member.nick}
• Roles: ${member.roles.length}
• Status: ${member.status}
• Rich Presence: ${member.game ? member.game.name : "None"}
• Joined Guild At: ${client.util.timeStamp(member.joinedAt)}
• Created Discord At: ${client.util.timeStamp(user.createdAt)}
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


exports.aliases = [];
