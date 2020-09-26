exports.run = function (client, msg, args) {
    let user = msg.mentions[0] || client.users.get(args[0]);
    let userReply = msg.author;
    if(!user) user = msg.author;
    let avatarLarge = user.dynamicAvatarURL("", 1024);

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

exports.aliases = ["av"];
