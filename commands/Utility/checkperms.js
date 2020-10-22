exports.run = function(client, msg, args) {
    let user = msg.mentions[0] || client.users.get(args[0]);
    let userReply = msg.author;
    if(!user) user = msg.author;

    let msgEmbed = {
    	embed: {
    		color: client.config.colors.success,
    		description: ``,
            author: {
                name: `${user.username} Permission`,
                icon_url: user.dynamicAvatarURL("", 4096)
            }
    	}
    }

	Object.entries(msg.channel.permissionsOf(user.id).json).forEach(([key, val]) => {
		msgEmbed.embed.description += `**${key}**, `
	})
    msg.channel.createMessage(msgEmbed)
}

exports.help = {
    cooldown: 5,
    ratelimit: 1,
    userPerms: [],
    description: "Check a permission of the users!",
    usage: `j!checkperms [userid/mention]`,
    example: `j!checkperms @JadlionHD`,
    aliases: ["perms"]
}