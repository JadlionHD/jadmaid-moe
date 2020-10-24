const moment = require("moment-timezone");

exports.run = function (client, msg, args) {
	let user = msg.author;
	var dailyEmojis = ["<:anemone:708579765564735559>", "<:aurora:708579799274225664>", "<:obsidian:708579876076126278>", "<:lavalamp:708579845793382413>", "<:fissure:708581746647760927>", "<:waterfall:708579889057366037>", "<:hiddendoor:708579825383637012>"];
	var daily = ['Anemone', 'Aurora', 'Obsidian', 'Lava Lamp', 'Fissure', 'Waterfall', 'Hidden Door'];
	var index = moment.tz(Date.now(), 'America/New_York').day();

	client.getMessages("728957534613798993").then((messages) => {
		let msgEmbed = {
			embed: {

			}
		}
		let msgDaily = {
			name: `Daily Block:`,
			value: `${dailyEmojis[index]} ${daily[index]}`,
			inline: true
		}
		msgEmbed.embed = messages[0].embeds[0]
		// //delete msgEmbed.embed.type;
		// if(!msgEmbed.embed.footer.text) msgEmbed.embed.footer.text = `Replying to ${user.username}#${user.discriminator}`;
		// if(!msgEmbed.embed.footer.icon_url) msgEmbed.embed.footer.icon_url = `${user.avatarURL}`;
		// if(!msgEmbed.embed.fields)
		// 	return;
		// else
		// 	msgEmbed.embed.fields[2] = msgDaily;




		msg.channel.createMessage(msgEmbed)
	})
}

exports.help = {
	cooldown: 3,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Getting growtopia daily information",
    usage: `j!gtdaily (no argument)`,
    example: `j!gtdaily`,
	aliases: []
}