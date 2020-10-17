exports.run = function (client, msg, args) {
    let user = msg.mentions[0] || client.users.get(args[0]);
    let userReply = msg.author;
    if(!user) user = msg.author;
    let avatarLarge = user.dynamicAvatarURL("", 4096);

    msg.channel.createMessage({
        embed: {
            color: client.config.colors.success,
            title: `Showing ${user.username}#${user.discriminator} avatar!`,
            url: avatarLarge,
            image: {
                url: avatarLarge
            },
            footer: {
                text: `Replying to ${userReply.username}#${userReply.discriminator}`,
                icon_url: `${userReply.avatarURL}`
            }            
        }
    })
}

exports.help = {
    cooldown: 3,
    ratelimit: 1,
    userPerms: [],
    description: "Show avatar of users",
    usage: `j!avatar [userid/mention]`,
    example: `j!avatar @JadlionHD`,
    aliases: ["av"]
}
