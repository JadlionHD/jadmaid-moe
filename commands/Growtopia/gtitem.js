const scrape = require("scrape-it");
const request = require("request");
const cheerio = require("cheerio");
const itemDB = require('../../database.json');

exports.run = function (client, msg, args) {
	let say = args.join(" ");
	if(!say) return msg.channel.createMessage("<:cross:762537848691752960> Please enter specific item info that you wanted to see");
	if(say.includes("seed")) msg.channel.createMessage("<:cross:762537848691752960> Item not exist! try search the item with different name.");
	let user = msg.author;

	function titleCase(str) {
	   var splitStr = str.toLowerCase().split(' ');
	   for (var i = 0; i < splitStr.length; i++) {
	       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
	   }
	   return splitStr.join(' '); 
	}

	scrape(`https://growtopia.wikia.com/wiki/${titleCase(say)}`, {
        description: {
          selector: "#mw-content-text > div.gtw-card.item-card > div:nth-child(2)"
        },
        recipe: {
            selector: 'table.content',
            convert: x => x.replace(/\n/g, "")
        },
        properties: {
          selector: "#mw-content-text > div.gtw-card.item-card > div:nth-child(4)",
          trim: false,
          convert: x => x.replace(/This/g,",This").split(",").slice(1)
        },
        sprite: {
          selector: "div.card-header .growsprite > img",
          attr: "src"
        },
        rarity: ".s_rarity",
        itemrecipe2: {
          selector: "#mw-content-text > div:nth-child(3)",
          convert: x => x.replace(/\n/g, "")
        },
        splice: ".bg-splice",
        info: {
          selector: "#mw-content-text > p:nth-child(4)"
        },
        fullName: "b > .alternative-suggestion"
	}).then(async ({ data, response }) => {
		if(itemDB[say.toLowerCase()]) {
			let msgEmbed = {
				embed: {
					color: client.config.colors.success,
					description:`
\`\`\`yaml
Info: ${data.recipe}
\`\`\`
\`\`\`yaml
• Breakhits: ${itemDB[say.toLowerCase()].breakHits / 6} (Without Pickaxe, may not be accurate)
• GrowTime: ${client.util.secondParser(itemDB[say.toLowerCase() + " seed"].growTime)}
• ItemID: ${itemDB[say.toLowerCase()].itemID}
• Rarity: ${itemDB[say.toLowerCase()].rarity}
• SeedColor: ${itemDB[say.toLowerCase()].seedColor}
• Texture: ${itemDB[say.toLowerCase()].texture}
\`\`\`
`,
					footer: {
						text: `Replying to ${user.username}#${user.discriminator}`,
						icon_url: `${user.avatarURL}`
					},
					thumbnail: {
						url: data.sprite
					}
				}
			}
			msg.channel.createMessage(msgEmbed)
		} else {
			msg.channel.createMessage("Item not exist! try search the item with different name.");
		}
	})
}
/*
request({
	url: `https://growtopia.fandom.com/wiki/Category:Item?from=${titleCase(say)}`,
	method: "GET"
}, function(err, res, body) {
	let $ = cheerio.load(body);
	$(`.category-page__member-link`).map((index, element) => {
		const attributes = element.attribs;
		const nameItem = attributes.title;
		itemArray.push(nameItem)
	})
})
*/
exports.help = {
	cooldown: 5,
	ratelimit: 1,
	aliases: []
}