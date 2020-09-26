exports.run = function (client, msg, args) {
	let commands = Array.from(client.commands.keys()).sort().join(', ');
	let user = msg.author;

    msg.channel.createMessage({
    	embed: {
        	color: client.config.colors.success,
        	title: `<:GrowScan9000:535054816498679838> List commands`,
        	description: `
 \`\`\`yaml
• Prefix: ${client.config.PREFIX}
• Help commands: ${client.config.PREFIX}help
• Website: http://jadmaid.xyz
• Support server: https://discord.gg/zCr2jeZ
\`\`\`
`,
            fields: [
            	{
            		name: `<a:flex:606504992634961950> Fun commands:`,
            		value: `
\`\`\`yaml
8ball, baka, feed, howgay, hug, kiss, magik, pat, slap
\`\`\`
`,
            		inline: true
            	},
            	{
            		name: `<:Question:538303543363502082> Info commands:`,
            		value: `
\`\`\`yaml
avatar, corona, help, invite, math, ping, serverinfo, stats, topic, userinfo
\`\`\`
`,
            		inline: true
            	},
            	{
            		name: `<:growtopia_title:538303118698610702> Growtopia Reference:`,
            		value: `
\`\`\`yaml
gtachieve, gtdaily, gtitem, gtrender, gtwotd
\`\`\`
`,
            		inline: true
            	},
            	{
            		name: `<:Kewlgurl:709312006167068704> Anime commands:`,
            		value: `
\`\`\`yaml
anime, character, neko
\`\`\`
`,
            		inline: true
            	},
            	{
            		name: `👥 Support:`,
            		value: `
\`\`\`yaml
suggest, support
\`\`\`
`,
            		inline: true
            	}
            ],
        	footer: {
        		text: `Replying to ${user.username}#${user.discriminator}`,
        		icon_url: `${user.avatarURL}`
        	}
        }
    });
};

exports.aliases = [];