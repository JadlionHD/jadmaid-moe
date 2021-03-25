const axios = require("axios");
const anilist = require("../structures/anilistAPI.js")

module.exports = (client, packet, id) => {
	if(packet.t !== "INTERACTION_CREATE") return;
	let discord_url = `/interactions/${packet.d.id}/${packet.d.token}/callback`;
	console.log(packet.d.data.options[0])


	if(packet.d.data.name === "ping") {
		let res = {
			type: 4,
			data: {
				embeds: [
					{
						title: `you did it!`,
						color: client.config.colors.success
					}
				]
			}
		}
		client.requestHandler.request("POST", discord_url, true, res);
	}

	if(packet.d.data.name === "anime") {
		let args = packet.d.data.options;
		anilist.searchAnime(args[0].value).then(body => {
			let res = {
				type: 4,
				data: {
					content: "Success",
					embeds: [
						{
							title: body.data.Media.title.romaji,
							color: client.config.colors.success,
							description: `
\`\`\`yaml
Episodes: ${body.data.Media.episodes}
Status: ${body.data.Media.status}
Score: ${body.data.Media.averageScore}%
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
					]
				}
			}

			client.requestHandler.request("POST", discord_url, true, res)
		}).catch(e => {
			client.requestHandler.request("POST", discord_url, true, { type: 4, data: { content: "Anime not found!" } })
		})

	}

	// let a = {
	// 	name: "anime",
	// 	description: "searching a anime",
	// 	options: [
	// 		{
	// 			name: "name",
	// 			description: "the name of the anime",
	// 			type: 3,
	// 			required: true
	// 		}
	// 	]
	// }
}
