const cheerio = require("cheerio");
const request = require("request");
const itemDB = require('../../database.json');

exports.run = function (client, msg, args) {
	let say = args.join(" ");
	if(!say) return msg.channel.createMessage("Please enter specific item info that you wanted to see");
	let user = msg.author;

	function titleCase(str) {
	   var splitStr = str.toLowerCase().split(' ');
	   for (var i = 0; i < splitStr.length; i++) {
	       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	   }
	   return splitStr.join(' '); 
	}

	request({
		url: `https://growtopia.wikia.com/wiki/${titleCase(say)}`,
		method: "GET"
	}, function (err, res, body) {
		let $ = cheerio.load(body);
		let itemImg = $(".growsprite img").attr("src");
		if(itemDB[say.toLowerCase()]) {
			let msgEmbed = {
				embed: {
					color: client.config.colors.success,
					description:`
\`\`\`cpp
• Breakhits: ${itemDB[say.toLowerCase()].breakHits}
• ClothingType: ${itemDB[say.toLowerCase()].clothingType}
• EditableType: ${itemDB[say.toLowerCase()].editableType}
• GrowTime: ${itemDB[say.toLowerCase()].growTime}
• ItemID: ${itemDB[say.toLowerCase()].itemID}
• ItemKind: ${itemDB[say.toLowerCase()].itemKind}
• Rarity: ${itemDB[say.toLowerCase()].rarity}
• SeedColor: ${itemDB[say.toLowerCase()].seedColor}
• SeedOverlayColor: ${itemDB[say.toLowerCase()].seedOverlayColor}
• Texture: ${itemDB[say.toLowerCase()].texture}
\`\`\`
`,
					footer: {
						text: `Replying to ${user.username}#${user.discriminator}`,
						icon_url: `${user.avatarURL}`
					},
					thumbnail: {
						url: itemImg
					}
				}
			}

			msg.channel.createMessage(msgEmbed);
		} else {
			msg.channel.createMessage("The item that you type is not found :(");
		}
	})

}

exports.aliases = [];