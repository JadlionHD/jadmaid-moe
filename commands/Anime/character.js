const request = require("request");
let anilistURL = "https://graphql.anilist.co";

function splitter(str, l){
    var strs = [];
    while(str.length > l){
        var pos = str.substring(0, l).lastIndexOf(' ');
        pos = pos <= 0 ? l : pos;
        strs.push(str.substring(0, pos));
        var i = str.indexOf(' ', pos)+1;
        if(i < pos || i > pos+l)
            i = pos;
        str = str.substring(i);
    }
    strs.push(str);
    return strs;
}

exports.run = function (client , msg, args) {
	let req = args.join(" ");
    let userReply = msg.author;

	//if(client.util.isAlphaNumeric(req) === false) return msg.channel.createMessage("<:cross:762537848691752960> Please enter a valid alphanumeric");
	if(!req) return msg.channel.createMessage("<:cross:762537848691752960> Please enter specific name of the character anime!");

	request({
		url: anilistURL,
		method: "POST",
		json: true,
		body: {
			query: `
query {
  Character (search: "${req}") {
    name {
      first
      last
      full
      native
    }
    image {
      large
      medium
    }
    description
    siteUrl
  }
}
`
		}
	}, function(err, res, body) {
		if(res.statusCode === 404 || res.statusCode === 400) {
			msg.channel.createMessage("<:cross:762537848691752960> No result found!")
		}
		if(res.statusCode === 200) {
			let splitArray = splitter(body.data.Character.description.replace(/<br>|_/g, ""), 1024);
			let msgEmbed = {
				embed: {
					title: `${body.data.Character.name.full}`,
					url: body.data.Character.siteUrl,
					color: client.config.colors.success,
					fields: [
					],
					thumbnail: {
						url: body.data.Character.image.large
					},
			        footer: {
			        	text: `Replying to ${userReply.username}#${userReply.discriminator}`,
			        	icon_url: `${userReply.avatarURL}`
			        },
				}
			}
			for(let i = 0; i < splitArray.length; i++) {
				if(i > 4) break;
				let name = `❯ Description Part ${i}`;
				let value = splitArray[i];
				msgEmbed.embed.fields.push({name, value})
			}
			msg.channel.createMessage(msgEmbed)
		}
		// ${body.data.Character.description.replace(/__|_/g, "")}
	})
}

exports.help = {
	cooldown: 10,
	ratelimit: 1,
	userPerms: [],
    description: "Search some anime/manga characters",
    usage: `j!character <character name>`,
    example: `j!character kirigaya kazuto`,
	aliases: ["chara"]
}