const request = require("request");

exports.run = function (client , msg, args) {
	let req = args.join(" ");

	if(client.util.isAlphaNumeric(req) === false) return msg.channel.createMessage("<:cross:762537848691752960> Please enter a valid alphanumeric");
	if(!req) return msg.channel.createMessage("<:cross:762537848691752960> Please enter specific name of the character anime!");


	request({
		url: `http://api.jikan.moe/v3/search/character?q=${req}`,
		method: "GET",
		json: true 
	}, function(err, res, body) {
		if(res.statusCode === 200) {
	        let i = 0;
	        let i2 = 0;
	        let i3 = 0;
	        let x = "";
	        let x2 = "";
	        let userReply = msg.author;

	        for(i = 0; i < body.results[0].anime.length; i++){
	            x += body.results[0].anime[i].name + "\n"
	        }

	        let msgEmbed = {
	        	embed: {
	        		color: client.config.colors.success,
	        		title: body.results[0].name,
	        		url: body.results[0].url,
	        		description: x ? x : "N/A",
	        		thumbnail: {
	        			url: body.results[0].image_url
	        		},
		            footer: {
		                text: `Replying to ${userReply.username}#${userReply.discriminator}`,
		                icon_url: `${userReply.avatarURL}`
		            }  
	        	}
	        }
	        msg.channel.createMessage(msgEmbed);
		} else {
			msg.channel.createMessage("Character not exist! try search other.")
		}
	})
}

exports.help = {
	cooldown: 5,
	ratelimit: 1,
	userPerms: [],
    description: "Search some anime/manga characters",
    usage: `j!character <character name>`,
    example: `j!character kirigaya kazuto`,
	aliases: ["chara"]
}