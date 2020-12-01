exports.run = function(client, msg, args) {
    let user = msg.mentions[0] || client.users.get(args[0]);
    let userReply = msg.author;
    if(!user) user = msg.author;

    let msgEmbed = {
    	embed: {
    		color: client.config.colors.success,
    		description: `**Allowed Permission:**\n`,
            author: {
                name: `${user.username}`,
                icon_url: user.dynamicAvatarURL("", 4096)
            }
    	}
    }
	Object.entries(msg.channel.permissionsOf(user.id).json).forEach(([key, val]) => {
		msgEmbed.embed.description += `${key}, `
	})
    if(msgEmbed.embed.description.includes("administrator")) {
        msgEmbed.embed.description += `\n\n**Key Permission:**\nServer Admin`
    }
    msg.channel.createMessage(msgEmbed)
}

exports.help = {
    cooldown: 5,
    ratelimit: 1,
    userPerms: [],
    clientPerms: [],
    description: "Check a permission of the users!",
    usage: `j!checkperms [userid/mention]`,
    example: `j!checkperms @JadlionHD`,
    aliases: ["perms"]
}