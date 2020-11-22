const userFlags = require("eris").Constants.UserFlags;

exports.run = function (client, msg, args) {
    
	let user = msg.mentions[0] || client.users.get(args[0]) ||msg.author;
	let member = msg.channel.guild.members.get(user.id);
    let userReply = msg.author;
    if(!user) user = msg.channel.fetchMembers({userIDs: user.id});

    let emptyArray = [];

    Object.entries(userFlags).forEach(([key, val]) => {
        if(user.publicFlags & val) emptyArray.push(key) 
    })
    let msgEmbed = {
        embed: {
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
`,
        footer: {
            text: `Replying to ${userReply.username}#${userReply.discriminator}`,
            icon_url: `${userReply.avatarURL}`
        },
        thumbnail: {
            url: user.dynamicAvatarURL("", 1024)
        },
        fields: []
    }}
    let roleArray = [];
    member.roles.map(r => {
        let roleID = `<@&${r}> `
        roleArray.push(roleID)
    })
    let splitArray = client.util.splitter(roleArray.join(" "));
    for(let i = 0; i < splitArray.length; i++) {
        if(i > 2) break;
        let j = 1;
        j += i;
        let name = `Roles ${j}`;
        let value = splitArray[i];
        msgEmbed.embed.fields.push({name, value});
    }
    msg.channel.createMessage(msgEmbed);
};

 // <@&> member.roles

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
