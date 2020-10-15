const Kitsu = require("kitsu.js");
const kitsu = new Kitsu();

exports.run = function (client, msg, args) {
	const req = args.join(" ");
	if(!req) return msg.channel.createMessage("<:cross:762537848691752960> Please enter specific anime you want to search");


	const search = msg.content.split(/\s+/g).slice(1).join(" ");
	let user = msg.author;
	kitsu.searchAnime(req).then(async result => {
		if (result.length === 0) {
			return msg.channel.createMessage("No result found")
		}
		let anime = result[0];

		let msgEmbed = {
			embed: {
				title: `${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`,
				color: client.config.colors.success,
				description: `${anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0]}`,
				fields: [
					{
						name: `❯\u2000\Information`,
						value: `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`,
						inline: true
					},
					{
						name: `❯\u2000\Stats`,
						value: `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`,
						inline: true
					},
					{
						name: `❯\u2000\Status`,
						value: `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`,
						inline: true
					}
				],
		        footer: {
		        	text: `Replying to ${user.username}#${user.discriminator}`,
		        	icon_url: `${user.avatarURL}`
		        },
		        thumbnail: {
		        	url: anime.posterImage.original,
		        	height: 100,
		        	width: 200
		        }			
			}
		}

		msg.channel.createMessage(msgEmbed);
	})
}

exports.help = {
	cooldown: 5,
	ratelimit: 1,
	aliases: []
}