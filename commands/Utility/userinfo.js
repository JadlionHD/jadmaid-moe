const userFlags = require("eris").Constants.UserFlags;

exports.run = function (client, msg, args) {
    
	let user = msg.mentions[0] || client.users.get(args[0]) ||msg.author;
	let member = msg.channel.guild.members.get(user.id);
    let userReply = msg.author;

    let emptyArray = [];

    Object.entries(userFlags).forEach(([key, val]) => {
        if(user.publicFlags & val) emptyArray.push(key) 
    })

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
• Badges: ${emptyArray.map(str => `${str[0] + str.slice(1)}`).join(", ").replace(/_/g, ' ')}
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
    clientPerms: [],
    description: "Show a users information",
    usage: `j!userinfo [userid/mention]`,
    example: `j!userinfo @JadlionHD`,
    aliases: ["whois"]
}