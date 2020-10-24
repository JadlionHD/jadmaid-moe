const request = require("request");
const baseURL = "https://osu.ppy.sh/api/";
const modes = {
	"standard": "0", "s": "0",
	"taiko": "1", "t": "1",
	"catch": "2", "c": "2",
	"mania": "3", "m": "3"
};
const modesName = {
	"standard": "0", "s": "osu!standard",
	"taiko": "1", "t": "osu!taiko",
	"catch": "2", "c": "osu!catch",
	"mania": "3", "m": "osu!mania"
};

require("dotenv").config();

exports.run = function(client, msg, args) {
    let userReply = msg.author;

    if(!args[0] && !args[1]) {
    	msg.channel.createMessage("Usage: \`j!osu [user_name] [modes standard (s), taiko (t), catch (c), or mania (m)]\`");
    } else {
		request({
			url: `${baseURL}/get_user?k=${process.env.OSU_TOKEN}&m=${modes[args[1]]}&u=${args[0]}`,
			method: "GET",
			json: true
		}, function(err, res, body) {
			if(res.statusCode === 404 || res.statusCode === 400) {
				msg.channel.createMessage("<:cross:762537848691752960> No result found!");
			}
			if(res.statusCode === 200) {
				let userBody = body[0];
				if(!userBody) return msg.channel.createMessage("<:cross:762537848691752960> No result found!");
				let msgEmbed = {
					embed: {
						title: `${userBody.username} osu!stats`,
						description: `
**Modes:** ${modesName[args[1]] ? modesName[args[1]] : "osu!standard"}
**UserID:** ${userBody.user_id}
**Username:** ${userBody.username}
**Level:** ${Math.round(userBody.level)}
**Join Date:** ${userBody.join_date}
**Total Playcount:** ${userBody.playcount}
**Total Score:** ${userBody.total_score}
**Rank:** ${client.util.numberComa(userBody.pp_rank)}
**Rank Country:** ${client.util.numberComa(userBody.pp_country_rank)}
**Accuracy:** ${Math.round(userBody.accuracy)}%
**Total Time Played:** ${client.util.secondParser(userBody.total_seconds_played)}

**Rank SS:** ${userBody.count_rank_ss}
**Rank S:** ${userBody.count_rank_s}
**Rank A:** ${userBody.count_rank_a}
**Rank SSH:** ${userBody.count_rank_ssh}
**Rank SH:** ${userBody.count_rank_sh}
`,
						color: client.config.colors.success,
				        footer: {
				        	text: `Replying to ${userReply.username}#${userReply.discriminator}`,
				        	icon_url: `${userReply.avatarURL}`
				        },
				        thumbnail: {
				        	url: `https://a.ppy.sh/${userBody.user_id}`
				        }
					}
				}
				msg.channel.createMessage(msgEmbed)
			}
		})
	}
}

exports.help = {
    cooldown: 5,
    ratelimit: 1,
    userPerms: [],
    clientPerms: [],
    description: "Fetch some osu!user details",
    usage: `j!osu [user_name] [modes standard (s), taiko (t), catch (c), or mania (m)]`,
    example: `j!osu JadlionHD m`,
    aliases: []
}