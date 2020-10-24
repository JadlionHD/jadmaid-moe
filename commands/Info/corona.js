const request = require("request");

exports.run = function(client, msg, args) {
	let req = args.join(" ");
	if(!req) return msg.channel.createMessage("<:cross:762537848691752960> Please enter specific country you want to see");
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	request({
		url: `https://disease.sh/v3/covid-19/countries/${req}`,
		method: "GET",
		json: true
	}, function (err, res, body) {
		if(res.statusCode === 404) {
			return msg.channel.createMessage("<:cross:762537848691752960> Please enter specific country you want to see");
		}

		if(res.statusCode === 200) {
			let userReply = msg.author;
			let msgEmbed = {
				embed: {
					title: `${body.country} cases`,
					color: client.config.colors.success,
					description: `
**Others:**
\`\`\`yaml
• Population: ${numberWithCommas(body.population)}
• Active: ${numberWithCommas(body.active)}
\`\`\`
`,
					fields: [
						{
							name: `Today:`,
							value: `
\`\`\`yaml
• Confirmed: ${numberWithCommas(body.todayCases)}
• Deaths: ${numberWithCommas(body.todayDeaths)}
• Recovered: ${numberWithCommas(body.todayRecovered)}
\`\`\`
`,
							inline: true
						},
						{
							name: `Total:`,
							value: `
\`\`\`yaml
• Confirmed: ${numberWithCommas(body.cases)}
• Deaths: ${numberWithCommas(body.deaths)}
• Recovered: ${numberWithCommas(body.recovered)}
\`\`\`
`,
							inline: true
						}
					],
		            footer: {
		                text: `Replying to ${userReply.username}#${userReply.discriminator}`,
		                icon_url: `${userReply.avatarURL}`
		            },
		            thumbnail: {
		            	url: body.countryInfo.flag
		            }
				}
			}

			msg.channel.createMessage(msgEmbed);
		}
	})
}

exports.help = {
	cooldown: 5,
	ratelimit: 1,
	userPerms: [],
	clientPerms: [],
    description: "Showing statistic of covid-19",
    usage: `j!corona [country]`,
    example: `j!corona indonesia`,
	aliases: ["covid"]
}