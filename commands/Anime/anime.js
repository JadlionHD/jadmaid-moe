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

exports.run = function (client, msg, args) {
	const req = args.join(" ");
	let userReply = msg.author;
	if(!req) return msg.channel.createMessage("<:cross:762537848691752960> Please enter specific anime you want to search");


	request({
		url: anilistURL,
		method: "POST",
		json: true,
		body: {
			query: `
query {
  Media (search: "${req}", type: ANIME) {
    id
    episodes
    type
    description(asHtml: false)
    averageScore
    duration
    source
    status
    popularity
    isAdult
    favourites
    bannerImage
    coverImage {
      large
    }
    title {
      romaji
      native
      userPreferred
    }
    genres
    startDate {
      year
      month
      day
    }
  }
}
`
		}
	}, function(err, res, body) {
		if(!body.data.Media.description) return msg.channel.createMessage("<:cross:762537848691752960> No result found!");

		if(res.statusCode === 404 || res.statusCode === 400) {
			msg.channel.createMessage("<:cross:762537848691752960> No result found!")
		}
		
		if(res.statusCode === 200) {
			let splitArray = splitter(body.data.Media.description ? body.data.Media.description: "undefined", 1024);
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
					image: {
						url: body.data.Media.bannerImage
					},
			        footer: {
			        	text: `Powered by AniList`,
			        	icon_url: `https://anilist.co/img/icons/android-chrome-512x512.png`
			        },
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
			// ${body.data.Media.description}
			
		}
	})
}

/*
query {
	Page(page: 0) {
    media(search: "SAO", type: ANIME) {
      title {
        romaji
        english
        native
        userPreferred
      }
      description
    }
  }
}
*/

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