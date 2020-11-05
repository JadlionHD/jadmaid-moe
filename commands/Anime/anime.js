const request = require("request");
const anilist = require("../../structures/anilistAPI.js");

exports.run = function (client, msg, args) {
	const req = args.join(" ");
	let userReply = msg.author;
	if(!req) return msg.channel.createMessage("<:cross:762537848691752960> Please enter specific anime you want to search");

	anilist.searchAnime(req).then((body) => {
		let splitArray;
		if(body.data.Media.description.includes("<br>")) {
			let splitResult = client.util.splitter(body.data.Media.description.replace(/<br>/g, "") ? body.data.Media.description.replace(/<br>/g, ""): "undefined", 1024);
			splitArray = splitResult;
		} else {
			let splitResult = client.util.splitter(body.data.Media.description ? body.data.Media.description: "undefined", 1024);
			splitArray = splitResult;
		}
		let msgEmbed = {
			embed: {
				title: `${body.data.Media.title.romaji}`,
				color: client.config.colors.success,
				fields: [],
				description: `
\`\`\`yaml
❯ Episodes: ${body.data.Media.episodes} (${body.data.Media.duration} minutes per episode)
❯ Type: ${body.data.Media.type}
❯ Score: ${body.data.Media.averageScore}%
❯ Source: ${body.data.Media.source}
❯ Status: ${body.data.Media.status}
❯ Popularity: ${body.data.Media.popularity}
❯ Favourites: ${body.data.Media.favourites}
❯ Genres: ${body.data.Media.genres.map(str => `${str[0] + str.slice(1)}`).join(", ").replace(/_/g, ' ')}
❯ Start Date: ${body.data.Media.startDate.month}/${body.data.Media.startDate.day}/${body.data.Media.startDate.year} (month/day/year)
\`\`\`
`,
				thumbnail: {
					url: body.data.Media.coverImage.large
				},
		        footer: {
		        	text: `Powered by AniList`,
		        	icon_url: `https://anilist.co/img/icons/android-chrome-512x512.png`
		        },
				image: {
					url: body.data.Media.bannerImage
				}
			}
		}
		for(let i = 0; i < splitArray.length; i++) {
			if(i > 4) break;
			let j = 1;
			j += i;
			let name = `❯ Description Part ${j}`;
			let value = splitArray[i];
			msgEmbed.embed.fields.push({name, value})
		}
		msg.channel.createMessage(msgEmbed)
	}).catch(e => {
		msg.channel.createMessage("<:cross:762537848691752960> No Result Found")
	})
}

exports.help = {
	cooldown: 10,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Search some info about animes",
    usage: `j!anime [anime]`,
    example: `j!anime konosuba`,
	aliases: []
}