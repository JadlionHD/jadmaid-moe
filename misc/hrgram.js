const request = require("request");
const cron = require("cron");
// 00 12 * * *

module.exports = (client) => {
	let dailyMessage = new cron.CronJob("00 12 * * *", async () => {
		request({
			url: `https://disease.sh/v3/covid-19/countries/indonesia`,
			method: "GET",
			json: true
		}, function (err, res, body) {
			if(res.statusCode === 200) {
				let msgEmbed = {
					embed: {
						title: `${body.country} cases`,
						color: client.config.colors.success,
						description: `
**Others:**
\`\`\`yaml
• Population: ${client.util.numberComa(body.population)}
• Active: ${client.util.numberComa(body.active)}
\`\`\`
`,
						fields: [
							{
								name: `Total:`,
								value: `
\`\`\`yaml
• Confirmed: ${client.util.numberComa(body.cases)}
• Deaths: ${client.util.numberComa(body.deaths)}
• Recovered: ${client.util.numberComa(body.recovered)}
\`\`\`
`,
								inline: true
							}
						],
			            footer: {
			                text: `Status corona di indonesia`,
			                icon_url: `${body.countryInfo.flag}`
			            },
			            thumbnail: {
			            	url: body.countryInfo.flag
			            }
					}
				}

				client.createMessage("693437164238929951", msgEmbed);
				setTimeout( () => {
					client.crosspostMessage("693437164238929951", client.getChannel("693437164238929951").lastMessageID)
				}, 10000) 
			}
		})

	})
	dailyMessage.start();
}
